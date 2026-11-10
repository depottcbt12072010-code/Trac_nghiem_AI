/**
 * VUI ĐỂ HỌC – NHẬT KÝ TRUY CẬP & XÁC THỰC QUẢN TRỊ
 * Backend Google Apps Script – triển khai thành Web App.
 *
 * BẢO MẬT:
 * - Web App chạy bằng tài khoản chủ sở hữu.
 * - Mọi yêu cầu đọc nhật ký phải có session token hợp lệ do máy chủ cấp.
 * - Mật khẩu Admin chỉ lưu dạng SHA-256 + salt trong Script Properties.
 * - Không lưu mật khẩu, OTP hoặc nội dung câu trả lời chi tiết.
 */

const AUDIT_SHEET_NAME = 'NHAT_KY_TRUY_CAP';
const AUDIT_HEADERS = [
  'THOI_GIAN', 'MA_NGUOI_DUNG', 'MA_PHIEN', 'VAI_TRO',
  'SU_KIEN', 'MAN_HINH', 'CHI_TIET', 'THIET_BI',
  'TRINH_DUYET', 'HE_DIEU_HANH', 'KET_QUA'
];
const AUDIT_SESSION_SECONDS = 21600; // 6 giờ
const AUDIT_MAX_BATCH = 20;
const AUDIT_MAX_ROWS_READ = 20000;

function doGet() {
  return HtmlService.createHtmlOutput(
    '<!doctype html><html><head><meta charset="utf-8"></head><body>VUI ĐỂ HỌC – Audit API is running.</body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Chạy một lần sau khi tạo Script Properties ADMIN_SETUP_PASSWORD. */
function setAdminPasswordOnce() {
  const props = PropertiesService.getScriptProperties();
  const plain = props.getProperty('ADMIN_SETUP_PASSWORD');
  if (!plain || plain.length < 12) {
    throw new Error('Hãy tạo Script Property ADMIN_SETUP_PASSWORD với mật khẩu tối thiểu 12 ký tự trước.');
  }
  const salt = Utilities.getUuid() + Utilities.getUuid();
  props.setProperties({
    ADMIN_PASSWORD_SALT: salt,
    ADMIN_PASSWORD_HASH: hashText_(salt + ':' + plain),
    AUDIT_SETUP_DONE: '1'
  }, true);
  props.deleteProperty('ADMIN_SETUP_PASSWORD');
  ensureAuditSheet_();
  return 'Đã thiết lập mật khẩu Admin và bảng nhật ký. Hãy xóa mọi bản sao mật khẩu ban đầu.';
}

/** Có thể chạy thủ công để tạo/kiểm tra sheet nhật ký. */
function initializeAuditSystem() {
  ensureAuditSheet_();
  return 'Đã sẵn sàng sheet ' + AUDIT_SHEET_NAME;
}

function doPost(e) {
  let requestId = '';
  let result;
  try {
    const raw = e && e.parameter && e.parameter.payload ? e.parameter.payload : '';
    if (!raw || raw.length > 50000) throw new Error('Yêu cầu không hợp lệ.');
    const req = JSON.parse(raw);
    requestId = String(req.requestId || '').slice(0, 80);
    result = routeRequest_(req);
  } catch (err) {
    result = { ok: false, error: safeError_(err) };
  }
  const json = JSON.stringify({ channel: 'VUI_AUDIT', requestId: requestId, result: result })
    .replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
  const page = '<!doctype html><html><head><meta charset="utf-8"></head><body><script>' +
    '(function(){var m=' + json + ';' +
    'try{window.parent.postMessage(m,"*");}catch(e){}' +
    'try{if(window.top!==window.parent)window.top.postMessage(m,"*");}catch(e){}' +
    '})();' +
    '</script></body></html>';
  return HtmlService.createHtmlOutput(page).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function routeRequest_(req) {
  const action = String(req.action || '');
  if (action === 'logEvents') return logEvents_(req);
  if (action === 'adminLogin') return adminLogin_(req);
  if (action === 'listLogs') return listLogs_(req);
  if (action === 'adminLogout') return adminLogout_(req);
  throw new Error('Không hỗ trợ yêu cầu này.');
}

function ensureAuditSheet_() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('AUDIT_SPREADSHEET_ID');
  let ss;
  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create('VUI ĐỂ HỌC – NHẬT KÝ TRUY CẬP');
    props.setProperty('AUDIT_SPREADSHEET_ID', ss.getId());
  }
  let sh = ss.getSheetByName(AUDIT_SHEET_NAME);
  if (!sh) sh = ss.insertSheet(AUDIT_SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, AUDIT_HEADERS.length).setValues([AUDIT_HEADERS]);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, AUDIT_HEADERS.length)
      .setBackground('#173f91').setFontColor('#ffffff').setFontWeight('bold');
    sh.autoResizeColumns(1, AUDIT_HEADERS.length);
  }
  return sh;
}

function logEvents_(req) {
  const events = Array.isArray(req.events) ? req.events.slice(0, AUDIT_MAX_BATCH) : [];
  if (!events.length) return { ok: true, saved: 0 };
  const clientId = clean_(req.clientId, 80) || 'unknown';
  const sessionId = clean_(req.sessionId, 80) || '';
  const userAgent = clean_(req.userAgent, 220);
  const device = clean_(req.device, 40);
  const os = clean_(req.os, 80);
  const cache = CacheService.getScriptCache();
  const rateKey = 'AUDIT_WRITE_RATE_' + hashText_(clientId);
  const currentRate = Number(cache.get(rateKey) || 0);
  if (currentRate >= 60) return { ok: false, error: 'Đã vượt giới hạn ghi nhật ký tạm thời.' };
  cache.put(rateKey, String(currentRate + events.length), 60);
  const sh = ensureAuditSheet_();
  const now = new Date();
  const allowed = new Set([
    'app_open', 'screen_open', 'menu_click', 'lesson_start', 'lesson_complete',
    'quiz_start', 'quiz_complete', 'answer_submit', 'game_start', 'game_complete',
    'achievement_view', 'leaderboard_view', 'admin_panel_open', 'admin_login_failed',
    'admin_logout', 'navigation', 'other'
  ]);
  const rows = events.map(ev => {
    const type = clean_(ev.type, 40);
    return [
      now,
      clientId,
      sessionId,
      'NGUOI_DUNG',
      allowed.has(type) ? type : 'other',
      clean_(ev.screen, 100),
      clean_(ev.detail, 240),
      device,
      userAgent,
      os,
      clean_(ev.result, 40)
    ];
  });
  sh.getRange(sh.getLastRow() + 1, 1, rows.length, AUDIT_HEADERS.length).setValues(rows);
  return { ok: true, saved: rows.length };
}

function adminLogin_(req) {
  const props = PropertiesService.getScriptProperties();
  const expected = props.getProperty('ADMIN_PASSWORD_HASH');
  const salt = props.getProperty('ADMIN_PASSWORD_SALT');
  if (!expected || !salt) throw new Error('Chưa thiết lập mật khẩu Quản trị trên Apps Script.');
  const password = String(req.password || '');
  const supplied = hashText_(salt + ':' + password);
  if (!constantTimeEqual_(expected, supplied)) {
    appendAdminEvent_('admin_login_failed', 'Đăng nhập Quản trị không thành công');
    return { ok: false, error: 'Mật khẩu Quản trị không chính xác.' };
  }
  const token = Utilities.getUuid() + '.' + Utilities.getUuid() + '.' + Utilities.getUuid();
  const cache = CacheService.getScriptCache();
  cache.put('AUDIT_SESSION_' + hashText_(token), 'ADMIN', AUDIT_SESSION_SECONDS);
  appendAdminEvent_('admin_login_success', 'Quản trị đăng nhập thành công');
  return { ok: true, token: token, expiresIn: AUDIT_SESSION_SECONDS, role: 'ADMIN' };
}

function requireAdmin_(token) {
  token = String(token || '');
  if (!token || token.length > 300) throw new Error('Phiên Quản trị không hợp lệ. Vui lòng đăng nhập lại.');
  const role = CacheService.getScriptCache().get('AUDIT_SESSION_' + hashText_(token));
  if (role !== 'ADMIN') throw new Error('Bạn không có quyền xem nhật ký hoặc phiên đã hết hạn.');
  return true;
}

function listLogs_(req) {
  requireAdmin_(req.token);
  const sh = ensureAuditSheet_();
  const last = sh.getLastRow();
  if (last < 2) return { ok: true, rows: [], total: 0 };
  const count = Math.min(last - 1, AUDIT_MAX_ROWS_READ);
  const values = sh.getRange(last - count + 1, 1, count, AUDIT_HEADERS.length).getValues();
  const from = req.from ? new Date(String(req.from) + 'T00:00:00') : null;
  const to = req.to ? new Date(String(req.to) + 'T23:59:59') : null;
  const eventFilter = clean_(req.event, 40);
  const keyword = clean_(req.keyword, 100).toLowerCase();
  const filtered = values.filter(r => {
    const d = r[0] instanceof Date ? r[0] : new Date(r[0]);
    if (from && d < from) return false;
    if (to && d > to) return false;
    if (eventFilter && String(r[4]) !== eventFilter) return false;
    if (keyword) {
      const hay = [r[1], r[2], r[5], r[6], r[7], r[8], r[9]].join(' ').toLowerCase();
      if (hay.indexOf(keyword) < 0) return false;
    }
    return true;
  }).reverse();
  const offset = Math.max(0, Number(req.offset) || 0);
  const limit = Math.min(100, Math.max(1, Number(req.limit) || 50));
  const page = filtered.slice(offset, offset + limit).map(r => ({
    time: r[0] instanceof Date ? Utilities.formatDate(r[0], 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss') : String(r[0]),
    clientId: String(r[1] || ''), sessionId: String(r[2] || ''),
    role: String(r[3] || ''), event: String(r[4] || ''),
    screen: String(r[5] || ''), detail: String(r[6] || ''),
    device: String(r[7] || ''), browser: String(r[8] || ''),
    os: String(r[9] || ''), result: String(r[10] || '')
  }));
  appendAdminEvent_('admin_read_logs', 'Quản trị tra cứu nhật ký');
  return { ok: true, rows: page, total: filtered.length, offset: offset, limit: limit };
}

function adminLogout_(req) {
  const token = String(req.token || '');
  if (token) CacheService.getScriptCache().remove('AUDIT_SESSION_' + hashText_(token));
  appendAdminEvent_('admin_logout', 'Quản trị đăng xuất');
  return { ok: true };
}

function appendAdminEvent_(eventName, detail) {
  try {
    const sh = ensureAuditSheet_();
    sh.appendRow([new Date(), 'ADMIN', '', 'ADMIN', eventName, 'NHAT_KY_TRUY_CAP', detail, '', '', '', 'OK']);
  } catch (e) {}
}

function hashText_(text) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(text), Utilities.Charset.UTF_8);
  return bytes.map(b => ('0' + ((b + 256) % 256).toString(16)).slice(-2)).join('');
}
function constantTimeEqual_(a, b) {
  a = String(a); b = String(b);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
function clean_(value, max) {
  return String(value == null ? '' : value).replace(/[<>]/g, '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max || 200);
}
function safeError_(err) {
  return clean_(err && err.message ? err.message : 'Có lỗi xử lý yêu cầu.', 240);
}

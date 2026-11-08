# VUI ĐỂ HỌC – BẢN PWA

## Nội dung
- Giao diện thích ứng cho máy tính, iPhone/iPad và Android.
- Nút **Chơi Toán (10 câu ngẫu nhiên)**: mỗi lượt tạo 10 phép tính cộng/trừ mới.
- Số hạng và kết quả của từng phép tính đều trong phạm vi 1–20.
- Mỗi câu có 4 lựa chọn A–D; vị trí đáp án đúng được xáo trộn.
- Giữ lại trò chơi nhận diện 4 cử chỉ, camera, chấm điểm, thời gian, tạm dừng và chơi lại.
- Giữ ngân hàng câu hỏi, nhập Word, thiết lập hình ảnh và cấu hình của ứng dụng gốc.
- Có PWA manifest, biểu tượng và service worker.

## Triển khai
1. Giải nén toàn bộ thư mục `Vui_De_Hoc_PWA`.
2. Đưa toàn bộ nội dung thư mục lên máy chủ web hỗ trợ HTTPS.
3. Mở URL `https://.../index.html`.
4. Cho phép quyền Camera khi bắt đầu chơi hoặc kiểm tra camera.

## Cài lên màn hình chính
- iPhone/iPad: mở bằng Safari → Chia sẻ → Thêm vào MH chính.
- Android: mở bằng Chrome → menu ⋮ → Install app / Add to Home screen.
- Máy tính: mở bằng Chrome/Edge → Install trên thanh địa chỉ hoặc menu.

## Lưu ý
- Camera cần HTTPS hoặc localhost; mở trực tiếp file HTML bằng `file://` không đảm bảo quyền camera.
- MediaPipe và mô hình AI tải từ CDN/Google, cần Internet khi khởi động nhận diện.
- Bộ khung PWA được cache; không cam kết nhận diện AI hoạt động offline.
- Dữ liệu ngân hàng câu hỏi và cài đặt vẫn lưu trong bộ nhớ trình duyệt của từng thiết bị, không tự đồng bộ giữa các thiết bị.



const CACHE='vui-de-hoc-audit-admin-postmessage-fix-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon-152.webp','./icons/icon-192.webp','./assets/vuihoc_brand_logo_3d.png','./assets/main_menu_fullstage_3d.png','./assets/main_menu_hero_3d.png',
'./avatar_explorer.jpg','./avatar_team_blue.jpg','./avatar_team_red.jpg','./avatar_team_yellow.jpg','./avatar_team_green.jpg',
'./images/topics/nature.webp','./images/topics/land.webp','./images/topics/sea.webp',
'./images/topics/transport.webp','./images/topics/home.webp','./images/topics/school.webp',
'./images/topics/family.webp','./images/topics/numbers.webp','./images/topics/alphabet.webp'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;
 const url=new URL(req.url);if(url.origin!==self.location.origin)return;
 event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{
  if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;
 }).catch(()=>caches.match('./index.html'))));
});

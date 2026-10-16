/* Обновления: сначала сеть (если есть интернет), иначе кэш — так новая версия приходит сразу */
const C='money-v8',F=['./','index.html','i18n.js','manifest.json','icon-192.png','icon-512.png',
 ...['unbounded-cyrillic-500','unbounded-latin-500','unbounded-cyrillic-700','unbounded-latin-700','onest-cyrillic-400','onest-latin-400','onest-cyrillic-500','onest-latin-500','onest-cyrillic-600','onest-latin-600'].map(f=>'fonts/'+f+'-normal.woff2')];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 if(u.pathname.includes('/fonts/')||/\.png$/.test(u.pathname)){e.respondWith(caches.match(r).then(x=>x||fetch(r)));return}
 e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})
  .catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match('index.html'))))});
/* push-уведомления */
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={title:'Мои деньги',body:e.data?e.data.text():''}}
 e.waitUntil(self.registration.showNotification(d.title||'Мои деньги',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag,renotify:true,data:{url:'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if('focus' in c){c.postMessage('sync');return c.focus()}}return clients.openWindow('./')}))});

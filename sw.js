const C='money-v6',F=['./','index.html','i18n.js','manifest.json','icon-192.png','icon-512.png',
 ...['unbounded-cyrillic-500','unbounded-latin-500','unbounded-cyrillic-700','unbounded-latin-700','onest-cyrillic-400','onest-latin-400','onest-cyrillic-500','onest-latin-500','onest-cyrillic-600','onest-latin-600'].map(f=>'fonts/'+f+'-normal.woff2')];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))});

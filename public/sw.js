self.addEventListener('install', event => {
    
    caches.open('appShell4').then(cache => {
        cache.addAll([
            '/index.html',
            '/error.jpg', 
            '/static/media/password.e18325d8dd09e30f4009.jpg',
            '/icon/icon32x32.png',
            '/icon/icon48x48.png',
            '/icon/icon64x64.png',
            '/icon/icon128x128.png',
            '/icon/icon192x192.png',
            '/icon/icon256x256.png',
            '/icon/icon512x512.png',
            '/icon/icon1024x1024.png', 

        ])
    })

    self.skipWaiting(); 
})

self.addEventListener('activate', event => {
    caches.delete('appShell3')
})

self.addEventListener('fetch', event => {
    const resp = fetch(event.request).then(respuesta => {
        if (!respuesta) {
            return caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                } else {
                    return caches.match('/error.jpg'); 
                }
            });
        } else {
            return caches.open('dinamico').then(cache => {
                cache.put(event.request, respuesta.clone());
                return respuesta;
            });
        }
    }).catch(err => {
        return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            } else {
                return caches.match('/error.jpg');
            }
        });
    });

    event.respondWith(resp);
});
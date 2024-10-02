self.addEventListener('install', event => {
    
    caches.open('appShell').then(cache => {
        cache.addAll([
            ''
        ])
    })

    self.skipWaiting(); 
})

self.addEventListener('activate', event => {
    caches.delete('')
})

self.addEventListener('fetch', event => {
    const resp = fetch(event.request).then(respuesta => {
        if (!respuesta) {
            return caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                } else {
                    return caches.match('./src/img/error.jpg'); 
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
                return caches.match('./src/img/error.jpg');
            }
        });
    });

    event.respondWith(resp);
});
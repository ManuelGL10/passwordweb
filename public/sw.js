
const APP_SHELL_CACHE = 'appShell'; //Nombre de la caché principal
const DYNAMIC_CACHE = 'dynamic'; // Nombre de la caché dinamica
// Array de las rutas de los archivos esenciales
const APP_SHELL = [
    '/index.html',
    '/manifest.json',   
    '/error.jpg',
    '/static/media/password.e18325d8dd09e30f4009.jpg',
    '/icon/icon32.png',
    '/icon/icon48.png',
    '/icon/icon64.png',
    '/icon/icon128.png',
    '/icon/icon192.png',
    '/icon/icon256.png',
    '/icon/icon512.png',
    '/icon/icon1024.png', 
];

// Instalación del Service Worker y cacheo de archivos principales (app shell)
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(APP_SHELL_CACHE).then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(APP_SHELL);
      })
    );
});

// Activación del SW y limpieza de cachés
self.addEventListener('activate', (event) => {
    //Obtiene los nombres de las caches almacenadas 
    caches.keys().then((keys) => 
        keys
            .filter((keys) => key !== APP_SHELL_CACHE && key !== DYNAMIC_CACHE)
            .map((key) => caches.delete(key)) // Borra los caches que no sean actuales 
    )
}); 

// Listener para push
self.addEventListener('push', event => {
    let data = { title: 'PassGuard', body: 'Nuevo mensaje' };

    if (event.data) {
        console.log("Contenido del evento push:", event.data.text()); // Verifica qué se recibe
        try {
            data = event.data.json();
        } catch (error) {
            console.error("Error al parsear el JSON:", error);
            data.body = event.data.text();
            console.log(data.body)
        }
    }

    const opciones = {
        body: data.body,
        icon: '/icon/icon1024.png',
        silent: null
    };

    self.registration.showNotification(data.title, opciones);
});

self.addEventListener('fetch', event => {
    const resp = fetch(event.request).then(respuesta => {
        if (!respuesta) {
            // Si la respuesta no existe, buscamos en el cache
            return caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                } else {
                    // Si no está en el cache, retornamos una imagen de error desde el cache
                    return caches.match('/public/error.jpg');
                }
            });
        } else {
            // Si la respuesta existe, la almacenamos en el cache dinámico
            return caches.open(DYNAMIC_CACHE).then(cache => {
                cache.put(event.request.url, respuesta.clone());
                return respuesta;
            });
        }
    }).catch(err => {
        // Si ocurre un error (por ejemplo, si no hay conexión), buscamos en el cache
        return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            } else {
                // Si no está en el cache, retornamos la imagen de error
                return caches.match('/public/error.jpg');
            }
        });
    });

    event.respondWith(resp);
});

// Sincronización en segundo plano 
self.addEventListener('sync', event => {
    console.log('Sync event triggered', event);

    if (event.tag === 'sync-passwords'){
        syncPasswords();
    }
}); 

// Funcion para sincronizar datos de IndexedDB
function syncPasswords() {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open('passwordDB')
        
        dbRequest.onsuccess = event => {
            const db = event.target.result; 
            const transaction = db.transaction('passwords', 'readonly');
            const objectStore = transaction.objectStore('passwords');
            const getAllRequest = objectStore.getAll();

            getAllRequest.onsuccess = () => {
                const passwords = getAllRequest.result;

                if(passwords.length === 0){
                    console.log('No hay tareas para sincronizar.'); 
                }

                // Enviar cada tarea al backend
                const promises = passwords.map(password => {
                    return fetch('http://localhost:4000/post_passwords', {
                        method: 'POST', 
                        headers : {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(password)
                    })
                    .then(response => {
                        if(!response.ok){
                            throw new Error('Error en la API'); 
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Tarea sincronizada con éxito:', data);
                        eliminarPassword(password.id);
                    })
                    .catch(error => {
                        console.error('Error al sincronizar tarea:', error);
                    });
                });

                Promise.all(promises).then(() => resolve()).catch(reject);
                reject();
            };

            getAllRequest.onerror = event => {
                console.error('Error al obtner tareas de IndexedDB', event);
                reject();
            };
        };

        dbRequest.onerror = event => {
            console.error('Error al abrir la base de datos:', event);
            reject();
        };
    });
}


// Función para elimanar usuarios de IndexedDB
function eliminarPassword(id){
    const request = indexedDB.open('passwordDB'); 

    request.onerror = (event) => {
        console.error('Error abriendo la base de datos', event); 
    }; 

    request.onsuccess = (event) => {
        const db = event.target.result; 
        const transaction = db.transaction('passwords', 'readwrite');
        const objectStore = transaction.objectStore('passwords'); 
        const deleteRequest = objectStore.delete(id); 

        deleteRequest.onsuccess = () => {
            console.log(`Registro con id ${id} eliminado`); 
        };
    };
}
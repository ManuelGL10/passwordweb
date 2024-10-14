
self.addEventListener('sync', (event) => {
    if(event.tag === 'sync-passwords'){
        event.waitUntil(
            syncPasswords() //Sincronizar las tareas cuando haya conexión 
        );
    }
});

function syncPasswords(){
    return new Promise((resolve, reject) =>  {
        const dbRequest = indexedDB.open('passwordDB'); 

        dbRequest.onsuccess = event => {
            const db = event.target.result; 
            const transaction = db.transaction('passwords', 'readonly');
            const objectStore = transaction.objectStore('passwords');
            const getAllRequest = objectStore.getAll();

            getAllRequest.onsuccess = () => {
                const passwords = getAllRequest.result;

                if(passwords.length === 0){
                    console.log('No hay tareas para sincronizar.');
                    return resolve(); 
                }

                // Enviar cada tarea al backend 
                const promises = passwords.map(password => {
                    return fetch('http://localhost:4000/post_passwords', {
                        method: 'POST', 
                        headers: {
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
                        eliminarPasswordById(password.id);//Elimina tarea de Indexed tas sincronización
                    })
                    .catch(error => {
                        console.error('Error al sicronizar tarea:', error); 
                    }); 
                });

                Promise.all(promises).then(() => resolve()).catch(reject);
            }; 

            getAllRequest.onerror = event => {
                console.error('Error al obtener tareas de IndexedDB', event);
                reject(); 
            };
        }; 

        dbRequest.onerror = event => {
            console.error('Error al abrir la base de datos:', event);
            reject(); 
        };
    }); 
}

// Funcion para elimanar una tarea de IndexedDB

function eliminarPasswordById(id){
    let dbRequest = indexedDB.open('passwordDB'); 

    dbRequest.onsuccess = event => {
        let db = event.target.result;
        let transaction = db.transaction('passwords', 'readonly'); 
        let objectStore = transaction.objectStore('passwords'); 

        let deleteRequest = objectStore.delete(id); 

        deleteRequest.onsuccess = () => {
            console.log(`Tarea con ID ${id} eliminada de IndexedDB`); 
        };

        deleteRequest.onerror = () =>{
            console.error('Error al eliminar tarea de IndexedDB', event);
        };
    };
}

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
    event.waitUntil(
        // Obtiene los nombres de las cachés almacenadas
        caches.keys().then((keys) =>
            Promise.all(
            keys
                .filter((key) => key !== APP_SHELL_CACHE && key !== DYNAMIC_CACHE)
                .map((key) => caches.delete(key)) // Borra los cachpes que no sean los actuales
            )
        )
    );
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

    if (event.tag === 'sync-users'){
        event.waitUntil(syncPasswords());
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
                    return resolve();
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
                        eliminarPassword();
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
function eliminarPassword() {
    let db = indexedDB.open('passwordDB')

    db.onsuccess = event => {
        let result = event.target.result; 

        let transaction = result.transaction('passwords', 'readwrite');
        let obj = transaction.objectStore('passwords'); 

        let cursorRequest = obj.openCursor();

        cursorRequest.onsuccess = event => {
            let cursor = event.target.result;

            if (cursor) {
                // Mostramos el registro en la consola
                console.log('Contraseña encontrado:', cursor.value);
    
                // Eliminamos el registro actual
                let deleteRequest = cursor.delete();
    
                deleteRequest.onsuccess = () => {
                    console.log(`Contraseña con ID ${cursor.value.id} eliminado`);
                };
    
                // Continuamos con el siguiente registro
                cursor.continue();
            } else {
                // No quedan más registros
                console.log('No hay más Contraseñas por eliminar.');
            }
        }

        cursorRequest.onerror = event => {
            console.error('Error al abrir el cursor:', event);
        };
    }
}
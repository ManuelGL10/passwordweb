import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconEye, IconEyeOff, IconCopy, IconCheck, IconEdit, IconPlus, IconTrash} from "@tabler/icons-react";
import AddPasswordModal from "./AddPasswordModal";
import { data } from "autoprefixer";

const PasswordTable = () => {
  const [passwords, setPasswords] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copiedPasswordId, setCopiedPasswordId] = useState(null);
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const [newPassword, setNewPassword] = useState({
    nombre: "",
    tipo_elemento: "",
    url: "",
    password: "",
  });
  const [isSubscribed, setIsSubscribed] = useState(false);


  // Obtener contraseñas de la API
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get("http://localhost:4000/get_passwords", {
        headers: { userId },
      })
      .then((response) => setPasswords(response.data))
      .catch((error) => console.error("Error al obtener contraseñas", error));

    // Verificar suscripción y suscribirse si no está suscrito
    if (!localStorage.getItem('isSubscribed')) {
      subscribeToNotifications();
      localStorage.setItem('isSubscribed', 'true'); // Marca que la suscripción fue hecha
    }
  }, []);
  

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const copyToClipboard = (password, id) => {
    navigator.clipboard.writeText(password).then(() => {
      setCopiedPasswordId(id);
      setTimeout(() => setCopiedPasswordId(null), 2000);
    });
  };

  // Maneja el cambio en el formulario del modal
  const handleChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario del modal
  const handleAddPassword = () => {

    const userId = localStorage.getItem("userId"); 

    if(!userId){
      console.error("Error: No se ha encontrado el ID de usuario."); 
      return;
    }

    const passwordToSend = {
      nombre: newPassword.nombre, 
      tipo_elemento: newPassword.tipo_elemento,
      url: newPassword.url, 
      password: newPassword.password,
      userId: userId,
    }; 

    console.log("Enviando datos al servidor:", passwordToSend);

    //Intenta enviar los datos al servidor 
    fetch('http://localhost:4000/post_passwords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(passwordToSend)
    })
    .then(response => {
      if (!response.ok){
        return response.json().then(data =>{
          throw new Error(`Error en la API: ${data.message}`);
        });
      }
      return response.json();
    })
    .then(data => {
      //Actualiza la lista de contraseñas con la nueva
      setPasswords([...passwords, data]); 
      setShowModal(false); // Cierra el modal
      setNewPassword({nombre: '', tipo_elemento: '', url: '', password: ''}); //Reinicia el formulario
    })
    .catch(error => {
      console.error('Error en la petición, guardando localmente:', error); 
      
      if ('serviceWorker' in navigator && 'SyncManager' in window){
        navigator.serviceWorker.ready.then(sw => {
          return sw.sync.register('sync-passwords'); 
        }).then(() => {
          console.log('Sincronización registrada');
        }).catch(err => console.error('Error al registrar la sincronización:', err));
      }

      savePasswordToIndexedDB(passwordToSend)
        .then(() => {
          console.log('Tarea guardada en IndexedDB debido a la falla en la red');
        })
        .catch(err => console.error('Error al guardar en IndexedDB:', err));
    });
  }

  const savePasswordToIndexedDB = (password) =>{
    return new Promise((resolve, reject) => {
      let dbRequest = indexedDB.open('passwordDB'); 

      dbRequest.onupgradeneeded = event => {
        let db = event.target.result; 
        if (!db.objectStoreNames.contains('passwords')){
          db.createObjectStore('passwords', { keyPath: 'id', autoIncrement: true}); 
        }
      }; 

      dbRequest.onsuccess = event => {
        let db = event.target.result; 
        let transaction = db.transaction('passwords', 'readwrite');
        let objectStore = transaction.objectStore('passwords');
        let addRequest = objectStore.add(password);

        addRequest.onsuccess = () => {
          resolve();
        };

        addRequest.onerror = () => {
          reject('Error al guardar en IndexedDB'); 
        };
      };

      dbRequest.onerror = () => {
        reject('Error al abrir IndexedDB'); 
      };
    });
  }; 

    // Delete password from the database
    const deletePassword = (id) => {
      const userId = localStorage.getItem("userId"); // Obtén el userId de localStorage
    
      axios.delete(`http://localhost:4000/delete/${id}`, {
        headers: { userId } // Envía el userId en el encabezado
      })
        .then(() => {
          setPasswords(passwords.filter((password) => password._id !== id)); // Actualiza el estado local
        })
        .catch((error) => {
          console.error("Error deleting password:", error);
        });
    };

    async function subscribeToNotifications() {
      const userId = localStorage.getItem("userId");
    
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const registration = await navigator.serviceWorker.ready;
    
          // Verificar si ya existe una suscripción
          const existingSubscription = await registration.pushManager.getSubscription();
          if (existingSubscription) {
            console.log("El usuario ya está suscrito");
            return;
          }
    
          // Solicitar permiso para notificaciones
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            const newSubscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: "BOUKMtuCea0YgGZ3nGNekNnNKw9WmHnOx9hKxY4umoh2V5_DcWdDzyfFXD3GBFaeckEkWFKi60clrBA7zYpJCWE"
            });
    
            // Formatear los datos de suscripción junto con userId
            const subscriptionData = {
              ...newSubscription.toJSON(),
              userId 
            };
    
            // Enviar la suscripción a la API
            const response = await fetch('http://localhost:4000/suscription', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(subscriptionData)
            });
    
            if (!response.ok) {
              throw new Error('Error en la solicitud: ' + response.statusText);
            }
    
            const data = await response.json();
            console.log('Suscripción guardada en la BD', data);
          } else {
            console.log("Permiso para notificaciones denegado");
          }
        } catch (error) {
          console.error('Error en el proceso de suscripción', error);
        }
      } else {
        console.log("El navegador no soporta Service Worker o Push Notifications");
      }
    }
    

return (
  <div className="container mx-auto px-6 py-8">
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
      <h2 className="text-3xl font-bold text-gray-800">Tus Contraseñas Guardadas</h2>
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-custom-204E51-light flex items-center space-x-2 w-full md:w-auto"
      >
        <IconPlus size={20} />
        <span>Agregar Contraseña</span>
      </button>
    </div>

    {/* Tabla de contraseñas */}
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg border border-gray-200">
        <thead className="bg-custom-204E51 text-white">
          <tr>
            <th className="py-3 px-6 text-left text-sm font-semibold">Nombre</th>
            <th className="py-3 px-6 text-left text-sm font-semibold hidden md:table-cell">Tipo de Elemento</th>
            <th className="py-3 px-6 text-left text-sm font-semibold hidden lg:table-cell">URL</th>
            <th className="py-3 px-6 text-left text-sm font-semibold">Contraseña</th>
            <th className="py-3 px-6 text-center text-sm font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((password) => (
            <tr key={password._id} className="border-b border-gray-200">
              <td className="py-4 px-6 text-gray-700">{password.nombre}</td>
              <td className="py-4 px-6 text-gray-700 hidden md:table-cell">{password.tipo_elemento}</td>
              <td className="py-4 px-6 text-blue-600 underline hidden lg:table-cell">
                <a href={password.url} target="_blank" rel="noopener noreferrer">
                  {password.url}
                </a>
              </td>
              <td className="py-4 px-6 text-gray-700">
                {visiblePasswords[password._id] ? password.password : "••••••••"}
              </td>
              <td className="py-4 px-6 text-center space-x-3 flex justify-center">
                <button onClick={() => togglePasswordVisibility(password._id)} className="text-gray-600 hover:text-custom-204E51 transition">
                  {visiblePasswords[password._id] ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                </button>
                <button onClick={() => copyToClipboard(password.password, password._id)} className="text-gray-600 hover:text-custom-204E51 transition">
                  {copiedPasswordId === password._id ? <IconCheck size={20} className="text-green-500" /> : <IconCopy size={20} />}
                </button>
                <button className="text-gray-600 hover:text-custom-204E51 transition">
                  <IconEdit size={20} />
                </button>
                <button className="text-gray-600 hover:text-custom-204E51 transition" onClick={() => deletePassword(password._id)}>
                    <IconTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


      {/* Importa y usa el modal */}
      <AddPasswordModal
        showModal={showModal}
        setShowModal={setShowModal}
        newPassword={newPassword}
        handleChange={handleChange}
        handleAddPassword={handleAddPassword}
      />
    </div>
  );
};

export default PasswordTable;

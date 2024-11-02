import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

if('serviceWorker' in navigator && 'SyncManager' in window){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('Service Worker registrado', reg); 
      if(Notification.permission == 'default'){
        Notification.requestPermission(permiso => {
          if(permiso == 'granted'){
            reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey:"BOUKMtuCea0YgGZ3nGNekNnNKw9WmHnOx9hKxY4umoh2V5_DcWdDzyfFXD3GBFaeckEkWFKi60clrBA7zYpJCWE"
            })
            .then(resp => resp.toJSON())
            .then(resp => {
              console.log('Subscription:', resp); 

              //Enviar la suscripcion a tu servidor
              fetch('http://localhost:4000/suscription',{
                method:'POST', 
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(resp)
              })
              .then(response => {
                if(!response.ok){
                  throw new Error('Error en la solicitud: ' + response.statusText); 
                }
                return response.json();
              })
              .then(data => {
                console.log('Suscripción guardada en la BD:', data); 
              })
              .catch(error => {
                console.log(error)
                  console.error('Error al enviar la suscripción', error);
              });
            });
          }else {
            console.log("El usuario no registro")
          }
        });
      }
    }).catch(err => console('Error al registrar el Service Worker', err)); 
  }); 
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

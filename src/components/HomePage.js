import React from 'react';
import passwordImg from '../img/password.jpg'


const HomePage = () => {

  return(
      <section className="bg-white py-16">
        <div id="home-container" className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-12">
          
          <div className="lg:w-1/2 text-center lg:text-left lg:pr-12">
            <h1 className="text-4xl lg:text-5xl block font-bold text-gray-900 mb-8">
              Protege tus contraseñas con PassGuard
            </h1>
            <p className="text-gray-600 text-lg lg:text-xl mb-6 block">
              PassGuard te ofrece una manera segura y fácil de almacenar y gestionar todas tus contraseñas. Mantén tu información privada a salvo en todo momento, sin preocuparte por olvidarlas.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out">
              Comienza Ahora
            </button>
          </div>

          
          <div className="lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
            <img
              src={passwordImg}
              alt="Gestión de contraseñas"
              className="rounded-2xl w-[1500px] my-4 shadow-2xl"
            />
          </div>
        </div>
      </section>

  );
};

export default HomePage;

import React from "react";

const LoginPage = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-lg bg-white p-16 rounded-lg shadow-lg"> 
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Iniciar Sesión en <span className="text-custom-204E51">PassGuard</span>
        </h2>
        <form className="space-y-6 text-center">
         
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 w-[100%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-204E51 focus:border-custom-204E51"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-2 w-[100%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-204E51 focus:border-custom-204E51"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-10 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

       
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-custom-204E51 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

       
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">¿No tienes una cuenta?</span>{" "}
          <a href="#" className="text-sm text-custom-204E51 hover:underline">
            Regístrate aquí
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

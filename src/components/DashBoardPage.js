import React from "react";

const DashBoardPage = () => {
    return(
    <div>
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800">
          ¡Bienvenido a tu panel de control, [NombreUsuario]!
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          Aquí puedes administrar tus contraseñas, revisar la seguridad de tus datos y mucho más.
        </p>
      </main>
    </div>
    );
};

export default DashBoardPage; 
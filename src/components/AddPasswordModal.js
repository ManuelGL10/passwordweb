import React from "react";

const AddPasswordModal = ({ showModal, setShowModal, newPassword, handleChange, handleAddPassword }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-6 text-center">Agregar Nueva Contraseña</h3>
        <div className="space-y-6">
          {/* Input: Nombre */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={newPassword.nombre}
              onChange={handleChange}
              className="w-[100%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-204E51-light"
            />
          </div>

          {/* Input: Tipo de Elemento */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="tipo_elemento">
              Tipo de Elemento
            </label>
            <input
              type="text"
              name="tipo_elemento"
              id="tipo_elemento"
              placeholder="Tipo de Elemento"
              value={newPassword.tipo_elemento}
              onChange={handleChange}
              className="w-[100%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-204E51-light"
            />
          </div>

          {/* Input: URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="url">
              URL
            </label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="URL"
              value={newPassword.url}
              onChange={handleChange}
              className="w-[100%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-204E51-light"
            />
          </div>

          {/* Input: Contraseña */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              value={newPassword.password}
              onChange={handleChange}
              className="w-[100%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-204E51-light"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddPassword}
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-custom-204E51-light transition"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPasswordModal;

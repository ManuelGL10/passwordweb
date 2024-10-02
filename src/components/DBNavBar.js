import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconMenu2, IconX } from '@tabler/icons-react';

const DBNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-black text-2xl block font-bold">
              PassGuard
            </Link>
          </div>

          {/* Bienvenida + Menú (pantallas grandes) */}
          <div className="hidden md:flex items-center space-x-8">
            <p className="text-lg font-medium text-gray-700">
              Bienvenido, <span className="font-bold">[NombreUsuario]</span>!
            </p>
            <div className="flex space-x-6">
              <Link
                to="/profile"
                className="text-gray-600 hover:text-custom-204E51 transition px-3 py-2 text-sm font-medium"
              >
                Mi Perfil
              </Link>
              <Link
                to="/settings"
                className="text-gray-600 hover:text-custom-204E51 transition px-3 py-2 text-sm font-medium"
              >
                Configuración
              </Link>
              <Link
                to="/logout"
                className="text-gray-600 hover:text-custom-204E51 transition px-3 py-2 text-sm font-medium"
              >
                Cerrar Sesión
              </Link>
            </div>
          </div>

          {/* Botón de menú (visible en pantallas pequeñas) */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black hover:text-gray-700 focus:outline-none">
              {isOpen ? <IconX className="h-6 w-6" /> : <IconMenu2 className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`fixed inset-y-0 right-0 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out bg-white w-64 sm:w-80 shadow-lg z-50 md:hidden`}
      >
        {/* Cerrar menú */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="text-black hover:text-gray-700 focus:outline-none">
            <IconX className="h-6 w-6" />
          </button>
        </div>

        {/* Links del menú móvil */}
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Mi Perfil
          </Link>
          <Link
            to="/settings"
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Configuración
          </Link>
          <Link
            to="/logout"
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Cerrar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DBNavBar;

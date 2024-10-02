import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBarHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'border-t-2 border-b-2 border-black text-black'
      : 'text-gray-700';

  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-black text-2xl block font-bold">
              PassGuard
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className={`${isActive(
                '/'
              )} hover:text-gray-700 px-3 py-2 text-sm font-medium block`}
            >
              Inicio
            </Link>
            <Link
              to="/features"
              className={`${isActive(
                '/features'
              )} hover:text-gray-700 px-3 py-2 text-sm font-medium block `}
            >
              Funciones
            </Link>
            <Link
              to="/pricing"
              className={`${isActive(
                '/pricing'
              )} hover:text-gray-700 px-3 py-2 text-sm font-medium block`}
            >
              Precios
            </Link>
          </div>

          
          <div className="hidden md:flex">
            <Link
              to="/login"
              className="text-white bg-black hover:bg-gray-800 px-3 py-2 rounded-md text-sm block font-medium"
            >
              Iniciar Sesión
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16m-7 6h7'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-y-0 right-0 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out bg-white w-64 sm:w-80 shadow-lg z-50 md:hidden`}
      >

        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>


        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium block"
          >
            Inicio
          </Link>
          <Link
            to="/features"
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium block"
          >
            Funciones
          </Link>
          <Link
            to="/pricing"
            onClick={() => setIsOpen(false)}
            className="text-black hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium block"
          >
            Precios
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="text-white bg-black hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium block"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBarHome;

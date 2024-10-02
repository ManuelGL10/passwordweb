import React, { useState } from "react";
import { IconEye, IconEyeOff, IconCopy, IconCheck, IconEdit } from "@tabler/icons-react";

const PasswordTable = () => {
  const passwords = [
    {
      id: 1,
      name: "Correo Gmail",
      type: "Correo Electrónico",
      url: "https://mail.google.com",
      password: "contraseña123",
    },
    {
      id: 2,
      name: "Netflix",
      type: "Servicio de Streaming",
      url: "https://www.netflix.com",
      password: "claveNetflix",
    },
    {
      id: 3,
      name: "GitHub",
      type: "Desarrollo",
      url: "https://github.com",
      password: "passwordGitHub",
    },
  ];

  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copiedPasswordId, setCopiedPasswordId] = useState(null);

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

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Tus Contraseñas Guardadas
      </h2>
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
              <tr key={password.id} className="border-b border-gray-200">
                <td className="py-4 px-6 text-gray-700">{password.name}</td>
                
                {/* Columna visible solo en pantallas medianas (md) y mayores */}
                <td className="py-4 px-6 text-gray-700 hidden md:table-cell">{password.type}</td>
                
                {/* Columna visible solo en pantallas grandes (lg) y mayores */}
                <td className="py-4 px-6 text-blue-600 underline hidden lg:table-cell">
                  <a href={password.url} target="_blank" rel="noopener noreferrer">
                    {password.url}
                  </a>
                </td>
                
                <td className="py-4 px-6 text-gray-700">
                  {visiblePasswords[password.id] ? password.password : "••••••••"}
                </td>
                
                <td className="py-4 px-6 text-center space-x-3 flex justify-center">
                  <button
                    onClick={() => togglePasswordVisibility(password.id)}
                    className="text-gray-600 hover:text-custom-204E51 transition"
                  >
                    {visiblePasswords[password.id] ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                  </button>
                  
                  <button
                    onClick={() => copyToClipboard(password.password, password.id)}
                    className="text-gray-600 hover:text-custom-204E51 transition"
                  >
                    {copiedPasswordId === password.id ? (
                      <IconCheck size={20} className="text-green-500" />
                    ) : (
                      <IconCopy size={20} />
                    )}
                  </button>
                  
                  <button className="text-gray-600 hover:text-custom-204E51 transition">
                    <IconEdit size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PasswordTable;

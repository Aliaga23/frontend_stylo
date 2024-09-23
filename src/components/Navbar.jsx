import React from 'react';

// Importa los iconos desde la carpeta assets
import buscarIcon from '../assets/buscar.png';
import userIcon from '../assets/user.png';
import carritoIcon from '../assets/carrito.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Links */}
        <div className="flex space-x-6">
          <a href="/" className="font-medium text-gray-700 hover:underline">Women</a>
          <a href="/" className="font-medium text-gray-700 hover:underline">Categories</a>
          <a href="/" className="font-medium text-gray-700 hover:underline">About</a>
          <a href="/" className="font-medium text-gray-700 hover:underline">Contact Us</a>
        </div>

        {/* Logo Centrado */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold tracking-wide">
          STYLO STORE
        </div>

        {/* Right Icons */}
        <div className="flex space-x-6">
          <button className="text-gray-500 hover:text-gray-900">
            <img src={buscarIcon} alt="Buscar" className="w-6 h-6" />
          </button>
          <Link to="/login" className="text-gray-500 hover:text-gray-900">
            <img src={userIcon} alt="User" className="w-6 h-6" />
          </Link>
          <button className="text-gray-500 hover:text-gray-900">
            <img src={carritoIcon} alt="Carrito" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

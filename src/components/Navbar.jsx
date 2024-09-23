import React, { useState } from 'react';

// Importa los iconos desde la carpeta assets
import buscarIcon from '../assets/buscar.png';
import userIcon from '../assets/user.png';
import carritoIcon from '../assets/carrito.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center relative px-4 md:px-0">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <a href="/" className="hover:text-gray-500 transition duration-300">STYLO STORE</a>
        </div>

        {/* Right Icons and Hamburger */}
        <div className="flex items-center space-x-6 relative z-10">
          {/* Search Icon (hidden on small screens) */}
          <a href="/search" className="text-gray-500 hover:text-gray-900 transition duration-300 hidden md:block" aria-label="Buscar">
            <img src={buscarIcon} alt="Buscar" className="w-6 h-6" />
          </a>

          {/* User Icon */}
          <a href="/login" className="text-gray-500 hover:text-gray-900 transition duration-300" aria-label="Login">
            <img src={userIcon} alt="User" className="w-6 h-6" />
          </a>

          {/* Cart Icon */}
          <a href="/cart" className="text-gray-500 hover:text-gray-900 transition duration-300" aria-label="Carrito">
            <img src={carritoIcon} alt="Carrito" className="w-6 h-6" />
          </a>

          {/* Hamburger Icon for mobile */}
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-900 md:hidden focus:outline-none transition duration-300"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú de navegación (visible en pantallas grandes) */}
        <div className="hidden md:flex space-x-8 absolute right-0 left-0 justify-center">
          <a href="/" className="font-medium text-gray-700 hover:underline transition duration-300">
            Women
          </a>
          <a href="/categories" className="font-medium text-gray-700 hover:underline transition duration-300">
            Categories
          </a>
          <a href="/about" className="font-medium text-gray-700 hover:underline transition duration-300">
            About
          </a>
          <a href="/contact" className="font-medium text-gray-700 hover:underline transition duration-300">
            Contact Us
          </a>
        </div>
      </div>

      {/* Mobile Menu (visible solo en pantallas pequeñas y si isOpen es true) */}
      <div
        className={`md:hidden transform transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white`}
      >
        <div className="flex flex-col space-y-4 p-4">
          <a href="/" onClick={toggleMenu} className="font-medium text-gray-700 hover:underline transition duration-300">
            Women
          </a>
          <a
            href="/categories"
            onClick={toggleMenu}
            className="font-medium text-gray-700 hover:underline transition duration-300"
          >
            Categories
          </a>
          <a
            href="/about"
            onClick={toggleMenu}
            className="font-medium text-gray-700 hover:underline transition duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            onClick={toggleMenu}
            className="font-medium text-gray-700 hover:underline transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

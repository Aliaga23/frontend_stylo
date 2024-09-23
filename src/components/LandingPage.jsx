import React from 'react';

// Importa las imágenes
import heroImage from '../assets/tienda.jpeg';
import accesoriosImage from '../assets/accesorios.png';
import zapatosImage from '../assets/zapatos.png';
import ropaImage from '../assets/ropa.png';
import Navbar from './Navbar';
const LandingPage = () => {
  return (
    <div>
            <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gray-200 h-screen flex items-center justify-center" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Imagen del Hero */}
      </section>

      {/* Categorías */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 mb-4 flex items-center justify-center">
                <img src={accesoriosImage} alt="Accesorios" className="h-full object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" />
              </div>
              <p className="text-lg font-medium">Accesories</p>
            </div>
            <div className="text-center p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 mb-4 flex items-center justify-center">
                <img src={zapatosImage} alt="Zapatos" className="h-full object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" />
              </div>
              <p className="text-lg font-medium">Shoes</p>
            </div>
            <div className="text-center p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 mb-4 flex items-center justify-center">
                <img src={ropaImage} alt="Ropa" className="h-full object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" />
              </div>
              <p className="text-lg font-medium">All</p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">STYLO STORE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-white p-4 rounded-lg shadow-lg">
              <div className="bg-gray-400 h-48 mb-4 flex items-center justify-center">
                <span className="text-white">Product 1</span>
              </div>
              <p className="text-lg font-medium mb-2">The Waffle Long Sleeve Crew</p>
              <p className="text-gray-500">$60</p>
            </div>
            <div className="text-center bg-white p-4 rounded-lg shadow-lg">
              <div className="bg-gray-400 h-48 mb-4 flex items-center justify-center">
                <span className="text-white">Product 2</span>
              </div>
              <p className="text-lg font-medium mb-2">The Bomber Jacket</p>
              <p className="text-gray-500">$148</p>
            </div>
            <div className="text-center bg-white p-4 rounded-lg shadow-lg">
              <div className="bg-gray-400 h-48 mb-4 flex items-center justify-center">
                <span className="text-white">Product 3</span>
              </div>
              <p className="text-lg font-medium mb-2">The Slim 4-Way Stretch Organic Jean</p>
              <p className="text-gray-500">$88</p>
            </div>
            <div className="text-center bg-white p-4 rounded-lg shadow-lg">
              <div className="bg-gray-400 h-48 mb-4 flex items-center justify-center">
                <span className="text-white">Product 4</span>
              </div>
              <p className="text-lg font-medium mb-2">The Essential Organic Crew</p>
              <p className="text-gray-500">$30</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default LandingPage;

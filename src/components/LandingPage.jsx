import React from 'react';

// Import images
import heroImage from '../assets/tienda.jpeg';
import accesoriosImage from '../assets/accesorios.jpg';
import zapatosImage from '../assets/zapatos.jpg';
import ropaImage from '../assets/ropa.jpg';
import abrigoImage from '../assets/abrigo.jpg'; // Importing abrigo image
import shippingIcon from '../assets/box2.png';
import craftedIcon from '../assets/gancho.png';
import locationIcon from '../assets/ubicacion.png';
import Navbar from './Navbar';

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
    <section 
  className="relative bg-gray-200 h-screen flex items-center justify-center"
  style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: '53% center' }}
>
</section>


      {/* Shop by Category */}
      <section className="py-16">
        <div className="w-full px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Category 1: Accessories */}
            <div className="text-center rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300">
              <div className="h-[650px] w-full flex items-center justify-center bg-gray-200">
                <img
                  src={accesoriosImage}
                  alt="Accesorios"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-lg font-medium mt-4">Pantalones</p>
            </div>

            {/* Category 2: Shoes */}
            <div className="text-center rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300">
              <div className="h-[650px] w-full flex items-center justify-center bg-gray-200">
                <img
                  src={zapatosImage}
                  alt="Zapatos"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-lg font-medium mt-4">Blusa</p>
            </div>

            {/* Category 3: Clothing */}
            <div className="text-center rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300">
              <div className="h-[650px] w-full flex items-center justify-center bg-gray-200">
                <img
                  src={ropaImage}
                  alt="Ropa"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-lg font-medium mt-4">Vestidos</p>
            </div>

            {/* Category 4: Abrigo */}
            <div className="text-center rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300">
              <div className="h-[650px] w-full flex items-center justify-center bg-gray-200">
                <img
                  src={abrigoImage}
                  alt="Abrigo"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-lg font-medium mt-4">Abrigo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
      <div className="text-center p-6 hover:shadow-2xl transform hover:scale-105 transition duration-300">
        <img src={shippingIcon} alt="Shipping" className="h-16 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold">Complimentary Shipping</h3>
        <p className="text-lg mt-2">Enjoy free shipping on BO orders over $100.</p>
      </div>
      <div className="text-center p-6 hover:shadow-2xl transform hover:scale-105 transition duration-300">
        <img src={craftedIcon} alt="Consciously Crafted" className="h-16 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold">Recycle</h3>
        <p className="text-lg mt-2">Designed with you and the planet in mind.</p>
      </div>
      <div className="text-center p-6 hover:shadow-2xl transform hover:scale-105 transition duration-300">
        <img src={locationIcon} alt="Come Say Hi" className="h-16 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold">Come Say Hi</h3>
        <p className="text-lg mt-2">We have 4 stores across Bolivia</p>
      </div>
    </div>
  </div>
</section>


      {/* Footer Section */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p>&copy; 2024 Stylo Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

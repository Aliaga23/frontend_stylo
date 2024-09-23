import React from 'react';
import signupImage from '../assets/signup.jpeg'; // Importamos la imagen del formulario
import fondoSignup from '../assets/fondo_signup.jpeg'; // Importamos el fondo
import Navbar from '../components/Navbar'; // Importamos el Navbar desde la carpeta components

const SignUpForm = () => {
  return (
    <>
      <Navbar /> {/* Incluimos el Navbar */}
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${fondoSignup})` }} // Usamos la imagen de fondo
      >
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left section with form */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 lg:p-16 bg-white">
            <div className="w-full lg:w-11/12 mx-auto"> {/* Ajustamos el ancho al 90% */}
              <h2 className="text-3xl font-semibold mb-4">Welcome to STYLO</h2>
              <p className="mb-4 text-sm">
                Already have an account? <a href="/login" className="text-blue-500">Log in</a>
              </p>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Username Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Username</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                  placeholder="Enter your password"
                />
              </div>

             
              {/* Terms and Privacy */}
              <p className="text-sm text-gray-500 mb-6">
                By creating an account, you agree to the <a href="/" className="text-blue-500">Terms of use</a> and <a href="/" className="text-blue-500">Privacy Policy</a>.
              </p>

              {/* Create Account Button */}
              <button className="w-full bg-gray-300 hover:bg-gray-400 text-white p-4 rounded-lg text-lg">
                Create an account
              </button>

              {/* Already have an account */}
              <p className="mt-4 text-center text-sm">
                Already have an account? <a href="/login" className="text-blue-500">Log in</a>
              </p>
            </div>
          </div>

          {/* Right section with image */}
          <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2">
            <img src={signupImage} alt="Signup" className="object-cover w-full h-full max-h-[740px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;

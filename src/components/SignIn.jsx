import React from 'react';
import signinImage from '../assets/signin.jpeg'; // Importamos la imagen del formulario
import fondoSignup from '../assets/fondo_signup.jpeg'; // Importamos el fondo que ya se usa en signup
import Navbar from '../components/Navbar'; // Importamos el Navbar desde la carpeta components

const SignInForm = () => {
  return (
    <>
      <Navbar /> {/* Incluimos el Navbar */}
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${fondoSignup})` }} // Usamos la imagen de fondo de SignUpForm
      >
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left section with image */}
          <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2">
            <img src={signinImage} alt="Signin" className="object-cover w-full h-full max-h-[730px]" />
          </div>

          {/* Right section with form */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 p-10 lg:p-20 bg-white">
            <div className="w-full lg:w-12/12 mx-auto"> {/* Ajustamos el ancho al 70% */}
              <div className="text-right mb-6">
                <span className="text-gray-500">Don’t have an account? </span>
                <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
              </div>

              <h2 className="text-4xl font-bold mb-6 text-center">Sign in</h2>

              {/* Username/Email Input */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  User name or email address
                </label>
                <input
                  type="text"
                  className="w-full p-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username or email"
                />
              </div>

              {/* Password Input */}
              <div className="mb-6 relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Your password</label>
                <input
                  type="password"
                  className="w-full p-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <div className="text-right mb-6">
                <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">Forget your password?</a>
              </div>

              {/* Sign in button */}
              <button className="w-full bg-gray-300 hover:bg-gray-400 text-white p-5 rounded-lg text-lg font-semibold">
                Sign in
              </button>

              {/* Sign up link */}
              <p className="mt-6 text-center text-sm">
                Por el momento para el dashboard ingresar aca  <a href="/usuario" className="text-blue-500 hover:underline">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;

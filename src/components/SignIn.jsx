import React, { useState } from 'react';
import axios from 'axios'; // Importamos axios para las solicitudes HTTP
import signinImage from '../assets/signin.jpeg';
import fondoSignup from '../assets/fondo_signup.jpeg';
import Navbar from '../components/Navbar'; // Importamos el Navbar

const SignInForm = () => {
  // Estados para manejar el email/username, password y los mensajes de error
  const [email, setEmailOrUsername] = useState('');
  const [passwordHash, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      const response = await axios.post('https://backendstylo-production.up.railway.app/auth/login', {
        email,         // Enviar el email
        passwordHash   // Enviar la contraseña
      });

      // Si la solicitud tiene éxito, almacenamos el token JWT en localStorage
      const token = response.data.token;
      const usuario = response.data.usuario;  // Extraer la información del usuario desde la respuesta

      // Guardar el token y la información del usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));  // Almacenar el objeto de usuario como string

      // Redirigir al usuario al dashboard o a la página que desees
      window.location.href = '/usuario';
    } catch (error) {
      // Si hay un error, establecer el mensaje de error
      setErrorMessage('Invalid login credentials. Please try again.');
    }
};


  return (
    <>
      <Navbar /> {/* Incluimos el Navbar */}
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${fondoSignup})` }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left section with image */}
          <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2">
            <img src={signinImage} alt="Signin" className="object-cover w-full h-full max-h-[730px]" />
          </div>

          {/* Right section with form */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 p-10 lg:p-20 bg-white">
            <div className="w-full lg:w-12/12 mx-auto">
              <div className="text-right mb-6">
                <span className="text-gray-500">Don’t have an account? </span>
                <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
              </div>

              <h2 className="text-4xl font-bold mb-6 text-center">Sign in</h2>

              {/* Mostrar mensaje de error si las credenciales son incorrectas */}
              {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

              <form onSubmit={handleSignIn}>
                {/* Username/Email Input */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    User name or email address
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmailOrUsername(e.target.value)} // Actualizar el estado del email o username
                    className="w-full p-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your username or email"
                  />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Your password</label>
                  <input
                    type="password"
                    value={passwordHash}
                    onChange={(e) => setPassword(e.target.value)} // Actualizar el estado de la contraseña
                    className="w-full p-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="text-right mb-6">
                  <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">Forget your password?</a>
                </div>

                {/* Sign in button */}
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-5 rounded-lg text-lg font-semibold">
                  Sign in
                </button>
              </form>

            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;

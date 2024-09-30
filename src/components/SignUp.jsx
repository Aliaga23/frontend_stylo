import React, { useState } from 'react';
import axios from 'axios'; // Importamos axios configurado
import signupImage from '../assets/signup.jpeg'; 
import fondoSignup from '../assets/fondo_signup.jpeg'; 
import Navbar from '../components/Navbar'; 

const SignUpForm = () => {
  // Estados para manejar los inputs
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Función para manejar el envío del formulario
  const handleSignUp = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    try {
      // Realizar la solicitud POST al endpoint de registro en tu backend
      const response = await axios.post('https://backendstylo-production.up.railway.app/auth/register', {
        nombre,         // Enviar el nombre
        email,          // Enviar el email
        passwordHash: password,  // Enviar la contraseña como passwordHash
        rolId: 2        // Asignar automáticamente el rol de usuario con ID 2
      });

      // Si el registro es exitoso
      if (response.status === 201 || response.status === 200) {
        setSuccessMessage('Account created successfully!');
        setErrorMessage(''); // Limpiar cualquier error previo
        // Limpiar el formulario
        setNombre('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      // Manejar errores y mostrar un mensaje
      setErrorMessage('Error creating account. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${fondoSignup})` }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 lg:p-16 bg-white">
            <div className="w-full lg:w-11/12 mx-auto">
              <h2 className="text-3xl font-semibold mb-4">Welcome to STYLO</h2>
              <p className="mb-4 text-sm">
                Already have an account? <a href="/login" className="text-blue-500">Log in</a>
              </p>

              {/* Mostrar mensaje de éxito o error */}
              {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
              {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

              <form onSubmit={handleSignUp}>
                {/* Nombre Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)} // Actualizar el estado
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Actualizar el estado
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="mb-4 relative">
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Actualizar el estado
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {/* Create Account Button */}
                <button type="submit" className="w-full bg-gray-300 hover:bg-gray-400 text-white p-4 rounded-lg text-lg">
                  Create an account
                </button>
              </form>

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

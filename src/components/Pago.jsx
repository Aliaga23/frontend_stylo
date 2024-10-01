import React, { useState, useEffect } from 'react';
import axios from '../api'; // Asegúrate de tener axios configurado correctamente
import Navbar from './Navbar'; // Para la barra de navegación

const Pago = () => {
  const [metodoPago, setMetodoPago] = useState(''); // Estado para el método de pago seleccionado
  const [pagoRealizado] = useState(false); // Para controlar si el pago ha sido realizado
  const [total, setTotal] = useState(0); // Total del carrito

  // Obtener el último carrito del usuario
  useEffect(() => {
    const fetchUltimoCarrito = async () => {
      try {
        const usuarioId = JSON.parse(localStorage.getItem('usuario')).id; // Obtener el ID del usuario desde localStorage
        
        // Obtener todos los carritos del usuario
        const response = await axios.get(`/carritos?usuarioId=${usuarioId}`);
        const carritos = response.data;
        
        // Obtener el carrito con el id más alto (el último carrito)
        if (carritos.length > 0) {
          const ultimoCarrito = carritos.reduce((max, carrito) => carrito.id > max.id ? carrito : max, carritos[0]);
          setTotal(ultimoCarrito.total);
        }
      } catch (error) {
        console.error('Error fetching carrito total:', error);
      }
    };

    fetchUltimoCarrito();
  }, []);

  // Manejo del proceso de pago con Stripe
  const realizarPago = async () => {
    if (!metodoPago) {
      alert('Por favor selecciona un método de pago.');
      return;
    }

    try {
      // Crear sesión de Stripe
      const response = await axios.post('/stripe/create-checkout-session', { total: total * 100 }); // Envío en centavos

      // Redirigir a la URL de checkout de Stripe
      const stripe = window.Stripe('pk_test_51Q4zCvKfqJNLiR1E3BLMrYlJjlXvg8MpJrHW0zR85nESNCLgUY8dfSlxezSOtuEhtv5vsav302XtGxYYk6M3Zf7q00a08IdGQW'); // Asegúrate de reemplazar con tu clave pública de Stripe
      await stripe.redirectToCheckout({ sessionId: response.data.id });

    } catch (error) {
      console.error('Error creando la sesión de Stripe:', error);
      alert('Error al procesar el pago, por favor intenta de nuevo.');
    }
  };

  if (pagoRealizado) {
    return (
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Pago realizado con éxito</h2>
        <p className="text-center">Gracias por tu compra. Serás redirigido a la página de inicio.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Método de Pago</h2>

        {/* Mostrar el total del carrito */}
        <div className="text-center mb-8">
          <p className="text-xl">Total a pagar: <span className="font-semibold">${total.toFixed(2)}</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Opción de Pago en Efectivo */}
          <div
            onClick={() => setMetodoPago('Efectivo')}
            className={`p-4 rounded-lg shadow-lg cursor-pointer ${metodoPago === 'Efectivo' ? 'border-2 border-blue-500' : ''}`}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Efectivo</h3>
            <p className="text-center">Paga con efectivo al recibir tu pedido.</p>
          </div>

          {/* Opción de Pago con Stripe */}
          <div
            onClick={() => setMetodoPago('Stripe')}
            className={`p-4 rounded-lg shadow-lg cursor-pointer ${metodoPago === 'Stripe' ? 'border-2 border-blue-500' : ''}`}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Stripe</h3>
            <p className="text-center">Paga en línea de manera segura con tarjeta de crédito o débito.</p>
          </div>

          {/* Opción de Pago con QR */}
          <div
            onClick={() => setMetodoPago('QR')}
            className={`p-4 rounded-lg shadow-lg cursor-pointer ${metodoPago === 'QR' ? 'border-2 border-blue-500' : ''}`}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">QR</h3>
            <p className="text-center">Escanea el código QR para pagar con tu billetera electrónica.</p>
          </div>
        </div>

        {/* Botón para confirmar el pago */}
        <div className="text-right mt-8">
          <button
            onClick={realizarPago}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pago;

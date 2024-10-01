import React, { useState, useEffect } from 'react';
import axios from '../api'; // Asegúrate de tener axios configurado
import Navbar from './Navbar'; // Para la barra de navegación
import { Link } from 'react-router-dom'; // Para navegar a la página de detalle del producto
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Cart = () => {
  const [carritoItems, setCarritoItems] = useState([]);  // Estado para los items del carrito
  const [total, setTotal] = useState(0); // Para calcular el total del carrito
  const [compraConfirmada, setCompraConfirmada] = useState(false); // Controlar si el carrito se ha confirmado
  const [carritoId, setCarritoId] = useState(null); // Guardar el ID del carrito activo
  const navigate = useNavigate(); // Usamos el hook useNavigate

  // Obtener el usuario del localStorage
  const usuarioId = JSON.parse(localStorage.getItem('usuario'));
  
  useEffect(() => {
    if (usuarioId.id) {
    }
  }, [usuarioId]);

  // Obtener los items del carrito del usuario actual
  const fetchCarritoItems = async () => {
    try {
      const response = await axios.get(`/carrito-items?usuarioId=${usuarioId.id}`);  // Obtener los items por usuarioId
      let items = response.data;

      if (!Array.isArray(items)) {
        items = [items];  // Asegurarse de que items sea un array
      }

      setCarritoItems(items);
      calcularTotal(items);  // Calcular el total basado en los items del carrito
    } catch (error) {
      console.error('Error fetching carrito items:', error);
    }
  };

  // Calcular el total del carrito
  const calcularTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0);
    setTotal(total);
  };

  // Actualizar la cantidad de un item en el carrito
  const updateCartItem = async (carritoItemId, nuevaCantidad) => {
    try {
      await axios.put(`/carrito-items/${carritoItemId}`, { cantidad: nuevaCantidad });
      fetchCarritoItems(); // Actualizar los items del carrito
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  // Eliminar un producto del carrito
  const removeFromCart = async (carritoItemId) => {
    try {
      await axios.delete(`/carrito-items/${carritoItemId}`);
      fetchCarritoItems(); // Actualizar el carrito
    } catch (error) {
      console.error('Error removing item from carrito:', error);
    }
  };

  // Confirmar carrito (añadirlo a CarritoCompras y eliminar los items del carrito actual)
  const confirmarCarrito = async () => {
    try {
      // Confirmar el carrito actual
      const response = await axios.post('/carritos', {
        usuarioId: usuarioId.id,  // ID del usuario obtenido de localStorage
        total: total,          // Total calculado
        fecha: new Date()      // Fecha actual
      });

      setCarritoId(response.data.id); // Guardar el ID del carrito confirmado
      setCompraConfirmada(true);      // Marcar el carrito como confirmado

      navigate('/pago');

      // Limpiar el frontend para que muestre el nuevo carrito vacío
      setCarritoItems([]); // Vaciar los ítems en el frontend
      setTotal(0);         // Reiniciar el total

      alert('Carrito confirmado y vaciado correctamente.');
    } catch (error) {
      console.error('Error confirming carrito:', error);
    }
  };

  // Renderizar contenido si el carrito ya ha sido confirmado
  if (compraConfirmada) {
    return (
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Carrito confirmado</h2>
        <p className="text-center">El carrito ha sido confirmado y registrado en el sistema.</p>
        <p className="text-center">ID del Carrito: {carritoId}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Carrito de Compras</h2>
        
        {/* Mostrar productos del carrito */}
        <div className="grid grid-cols-1 gap-8">
          {carritoItems.length === 0 ? (
            <p className="text-center">No hay productos en el carrito.</p>
          ) : (
            carritoItems.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
                <div className="flex items-center">
                  <div>
                    <h2 className="text-lg font-medium">{item.productoId}</h2>
                    <p className="text-sm">Cantidad: {item.cantidad}</p>
                    <Link to={`/productos/${item.productoId}`} className="text-blue-500 underline mt-2">
                      Ver Producto
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateCartItem(item.id, item.cantidad - 1)}
                    className="bg-gray-200 px-2 py-1 rounded mr-2"
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateCartItem(item.id, item.cantidad + 1)}
                    className="bg-gray-200 px-2 py-1 rounded mr-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
                <p className="text-lg">${item.precioUnitario * item.cantidad}</p>
              </div>
            ))
          )}
        </div>

        {/* Mostrar el total */}
        <div className="text-right text-xl font-bold mt-8">
          Total: ${total}
        </div>

        {/* Botón para confirmar carrito */}
        <div className="text-right mt-4">
          <button
            onClick={confirmarCarrito}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Confirmar Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React, { useState, useEffect } from 'react';
import axios from '../api';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'; // Importamos el componente Navbar

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`/productos/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProducto(); // Llamada a la función definida dentro de useEffect
  }, [id]); // Se asegura de que useEffect se ejecute nuevamente si 'id' cambia

  const addToCart = async () => {
    try {
      await axios.post('/carrito-items', {
        carritoId: 1, // Aquí puedes usar el ID del carrito activo
        productoId: producto.id,
        cantidad: 1,
        precioUnitario: producto.precio
      });
      alert('Producto añadido al carrito');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (!producto) return <p className="text-center text-2xl py-12">Cargando producto...</p>;

  return (
    <div>
      <Navbar /> {/* Navbar añadida */}
      
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Sección de la imagen del producto */}
          <div className="flex items-center justify-center bg-gray-100 p-4 rounded-lg shadow-lg">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="object-cover max-w-full h-auto rounded-lg border border-gray-300"
            />
          </div>

          {/* Detalles del producto */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {/* Nombre y Precio del Producto */}
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{producto.nombre}</h1>
            <p className="text-3xl text-gray-800 mb-4">${producto.precio}</p>

            {/* Descripción */}
            <p className="text-lg text-gray-600 mb-6">{producto.descripcion}</p>

            {/* Tallas disponibles */}
            {producto.talla && (
              <p className="text-lg text-gray-600 mb-4">Talla: {producto.talla}</p>
            )}

            {/* Stock disponible */}
            <p className={producto.stock > 0 ? "text-green-600 text-lg mb-6" : "text-red-600 text-lg mb-6"}>
              {producto.stock > 0 ? `En stock: ${producto.stock}` : 'Producto agotado'}
            </p>

            {/* Botón de Añadir al Carrito */}
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
              onClick={addToCart}
              disabled={producto.stock === 0}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

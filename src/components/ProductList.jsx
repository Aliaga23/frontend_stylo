import React, { useState, useEffect } from 'react';
import axios from '../api';
import Navbar from './Navbar'; // Importamos el componente Navbar
import { useNavigate } from 'react-router-dom'; // Para redireccionar a ProductDetail
import '../ProductList.css'; // Estilos

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [searchTerm, setSearchTerm] = useState(''); 

  const navigate = useNavigate(); // Para redireccionar a los detalles del producto

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  // Obtener todos los productos
  const fetchProductos = async () => {
    try {
      const response = await axios.get('/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Obtener las categorías de productos
  const fetchCategorias = async () => {
    try {
      const response = await axios.get('/categorias'); 
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Filtrar productos por búsqueda y categoría
  const filteredProducts = productos.filter((producto) => {
    if (selectedCategory && producto.categoriaId !== selectedCategory) return false;
    if (searchTerm && !producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Añadir producto al carrito
  const addToCart = async (productoId) => {
    try {
      await axios.post('/carrito-items', {
        carritoId: 1, // Aquí puedes usar el ID del carrito activo
        productoId,
        cantidad: 1, 
        precioUnitario: filteredProducts.find(p => p.id === productoId).precio
      });
      alert('Producto añadido al carrito');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div>
      <Navbar /> {/* Navbar añadido */}

      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Men's Clothing & Apparel - New Arrivals</h1>

        <div className="flex">
          {/* Filtros de productos */}
          <aside className="w-1/4 p-4">
            <h2 className="text-xl font-bold mb-4">Filtros</h2>

            {/* Filtro por Categoría */}
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2">Categoría</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="">Todas las categorías</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Barra de búsqueda */}
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2">Buscar Producto</h3>
              <input
                type="text"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          </aside>

          {/* Productos */}
          <div className="w-3/4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((producto) => (
                  <div key={producto.id} className="product-card">
                    <div className="product-image-container">
                      <img
                        src={producto.imagen} 
                        alt={producto.nombre}
                        className="product-image"
                      />
                      {producto.descuento && (
                        <span className="discount-badge">-{producto.descuento}%</span>
                      )}
                    </div>
                    <h2 className="text-lg font-medium mt-4">{producto.nombre}</h2>
                    <p className="text-lg mt-2">
                      ${producto.precio} <span className="text-gray-500 line-through">${producto.precioOriginal}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">{producto.descripcion}</p>

                    <div className="flex justify-between mt-4">
                      {/* Botón Ver Más */}
                      <button
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                        onClick={() => navigate(`/productos/${producto.id}`)} // Navega a ProductDetail
                      >
                        Ver Más
                      </button>

                      {/* Botón Añadir al Carrito */}
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        onClick={() => addToCart(producto.id)}
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center w-full">No se encontraron productos.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

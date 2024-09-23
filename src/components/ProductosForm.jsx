import React, { useState, useEffect } from 'react';
import axios from '../api'; // Asegúrate de que axios esté configurado con la base URL correcta
import Sidebar from './SideBar'; // Importa tu componente Sidebar
import { FaBars } from 'react-icons/fa'; // Icono para el botón de abrir el Sidebar

const ProductosCrud = () => {
  const [productos, setProductos] = useState([]);
  const [formState, setFormState] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    talla: '',
    tipoPrenda: '',
    color: '',
    medidas: '',
    categoriaId: '',
    stock: '',
    sucursalId: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar el sidebar

  useEffect(() => {
    fetchProductos();
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

  // Crear o actualizar un producto
  const createOrUpdateProducto = async () => {
    try {
      if (editingId) {
        await axios.put(`/productos/${editingId}`, formState);
      } else {
        await axios.post('/productos', formState);
      }
      resetForm();
      fetchProductos();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Eliminar un producto
  const deleteProducto = async (id) => {
    try {
      await axios.delete(`/productos/${id}`);
      fetchProductos();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Manejar los inputs del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormState({
      nombre: '',
      descripcion: '',
      precio: '',
      talla: '',
      tipoPrenda: '',
      color: '',
      medidas: '',
      categoriaId: '',
      stock: '',
      sucursalId: ''
    });
    setEditingId(null);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Overlay for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : ''}`}>
        <header className="flex justify-between items-center bg-white p-4 shadow-md">
          <h1 className="text-2xl font-semibold">Gestión de Productos</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 focus:outline-none md:hidden"
          >
            <FaBars />
          </button>
        </header>

        <main className="p-4">
          {/* Formulario */}
          <div className="bg-white p-4 rounded shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4">{editingId ? 'Actualizar' : 'Crear'} Producto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input id="nombre" type="text" placeholder="Nombre" value={formState.nombre} onChange={handleInputChange} className="border p-2 rounded w-full" />
              <input id="descripcion" type="text" placeholder="Descripción" value={formState.descripcion} onChange={handleInputChange} className="border p-2 rounded w-full" />
              <input id="precio" type="number" placeholder="Precio" value={formState.precio} onChange={handleInputChange} className="border p-2 rounded w-full" />
              <input id="talla" type="text" placeholder="Talla" value={formState.talla} onChange={handleInputChange} className="border p-2 rounded w-full" />
              <input id="tipoPrenda" type="text" placeholder="Tipo de Prenda" value={formState.tipoPrenda} onChange={handleInputChange} className="border p-2 rounded w-full" />
              <input id="color" type="text" placeholder="Color" value={formState.color} onChange={handleInputChange} className="border p-2 rounded w-full" />
              <input id="medidas" type="text" placeholder="Medidas" value={formState.medidas} onChange={handleInputChange} className="border p-2 rounded w-full" />
              <input id="categoriaId" type="number" placeholder="Categoría ID" value={formState.categoriaId} onChange={handleInputChange} className="border p-2 rounded w-full" />
              <input id="stock" type="number" placeholder="Stock" value={formState.stock} onChange={handleInputChange} className="border p-2 rounded w-full" />
              <input id="sucursalId" type="number" placeholder="Sucursal ID" value={formState.sucursalId} onChange={handleInputChange} className="border p-2 rounded w-full" />
            </div>
            <button onClick={createOrUpdateProducto} className="bg-green-500 text-white p-2 mt-4 rounded">
              {editingId ? 'Actualizar' : 'Creear'}
            </button>
          </div>

          {/* Tabla de productos */}
          <div className="bg-white rounded shadow-md overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Nombre</th>
                  <th className="border px-4 py-2">Descripción</th>
                  <th className="border px-4 py-2">Precio</th>
                  <th className="border px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td className="border px-4 py-2">{producto.nombre}</td>
                    <td className="border px-4 py-2">{producto.descripcion}</td>
                    <td className="border px-4 py-2">${producto.precio}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => {
                          setEditingId(producto.id);
                          setFormState({
                            nombre: producto.nombre,
                            descripcion: producto.descripcion,
                            precio: producto.precio,
                            talla: producto.talla,
                            tipoPrenda: producto.tipoPrenda,
                            color: producto.color,
                            medidas: producto.medidas,
                            categoriaId: producto.categoriaId,
                            stock: producto.stock,
                            sucursalId: producto.sucursalId
                          });
                        }}
                        className="bg-yellow-500 text-white p-1 mr-2 rounded"
                      >
                        Editar
                      </button>
                      <button onClick={() => deleteProducto(producto.id)} className="bg-red-500 text-white p-1 rounded">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductosCrud;

import React, { useState, useEffect } from 'react';
import axios from '../api';
import {  FaBars } from 'react-icons/fa';
import Sidebar from './SideBar';

const Inventario = () => {
  const [inventario, setInventario] = useState([]);
  const [productos, setProductos] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [formState, setFormState] = useState({
    producto_id: '',
    sucursal_id: '',
    cantidad_disponible: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch de inventario, productos y sucursales
  useEffect(() => {
    fetchInventario();
    fetchProductos();
    fetchSucursales();
  }, []);

  const fetchInventario = async () => {
    try {
      const response = await axios.get('/inventario');
      setInventario(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await axios.get('/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchSucursales = async () => {
    try {
      const response = await axios.get('/sucursales');
      setSucursales(response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const createOrUpdateInventario = async () => {
    try {
      if (editingId) {
        await axios.put(`/inventario/${editingId}`, formState);
      } else {
        await axios.post('/inventario', formState);
      }
      fetchInventario();
      resetForm();
    } catch (error) {
      console.error('Error saving inventory:', error);
    }
  };

  const deleteInventario = async (id) => {
    try {
      await axios.delete(`/inventario/${id}`);
      fetchInventario();
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  const resetForm = () => {
    setFormState({ producto_id: '', sucursal_id: '', cantidad_disponible: '' });
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
        <header className="bg-white p-4 shadow-md flex justify-between items-center">
          <h1 className="text-2xl">Gestión de Inventario</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 md:hidden"
          >
            <FaBars />
          </button>
        </header>

        <main className="p-4">
          {/* Formulario */}
          <div className="bg-white p-4 rounded shadow-md mb-6">
            <h3 className="text-lg font-semibold">{editingId ? 'Actualizar' : 'Agregar'} Inventario</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                id="producto_id"
                value={formState.producto_id}
                onChange={handleInputChange}
                className="border p-2 rounded"
              >
                <option value="">Seleccionar Producto</option>
                {productos.map((producto) => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre}
                  </option>
                ))}
              </select>

              <select
                id="sucursal_id"
                value={formState.sucursal_id}
                onChange={handleInputChange}
                className="border p-2 rounded"
              >
                <option value="">Seleccionar Sucursal</option>
                {sucursales.map((sucursal) => (
                  <option key={sucursal.id} value={sucursal.id}>
                    {sucursal.nombre}
                  </option>
                ))}
              </select>

              <input
                id="cantidad_disponible"
                type="number"
                placeholder="Cantidad Disponible"
                value={formState.cantidad_disponible}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
            </div>
            <button
              onClick={createOrUpdateInventario}
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              {editingId ? 'Actualizar' : 'Agregar'}
            </button>
          </div>

          {/* Tabla de inventario */}
          <div className="bg-white rounded shadow-md overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Producto</th>
                  <th className="border px-4 py-2">Sucursal</th>
                  <th className="border px-4 py-2">Cantidad Disponible</th>
                  <th className="border px-4 py-2">Última Actualización</th>
                  <th className="border px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {inventario.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.productoId}</td>
                    <td className="border px-4 py-2">{item.sucursalId}</td>
                    <td className="border px-4 py-2">{item.cantidadDisponible}</td>
                    <td className="border px-4 py-2">{item.fechaUltimaActualizacion}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => {
                          setEditingId(item.id);
                          setFormState({
                            producto_id: item.producto_id,
                            sucursal_id: item.sucursal_id,
                            cantidad_disponible: item.cantidad_disponible
                          });
                        }}
                        className="bg-yellow-500 text-white p-1 mr-2 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteInventario(item.id)}
                        className="bg-red-500 text-white p-1 rounded"
                      >
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

export default Inventario;

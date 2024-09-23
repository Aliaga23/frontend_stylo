import React, { useState, useEffect } from 'react';
import axios from '../api'; // Asegúrate de que axios esté configurado con la base URL correcta
import { FaBars } from 'react-icons/fa';
import Sidebar from './SideBar'; // Asegúrate de tener un componente Sidebar

const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [formState, setFormState] = useState({
    nombre: '',
    direccion: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch de sucursales
  useEffect(() => {
    fetchSucursales();
  }, []);

  const fetchSucursales = async () => {
    try {
      const response = await axios.get('/sucursales');
      setSucursales(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const createOrUpdateSucursal = async () => {
    try {
      if (editingId) {
        await axios.put(`/sucursales/${editingId}`, formState);
      } else {
        await axios.post('/sucursales', formState);
      }
      fetchSucursales();
      resetForm();
    } catch (error) {
      console.error('Error saving branch:', error);
    }
  };

  const deleteSucursal = async (id) => {
    try {
      await axios.delete(`/sucursales/${id}`);
      fetchSucursales();
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
  };

  const resetForm = () => {
    setFormState({ nombre: '', direccion: '' });
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
          <h1 className="text-2xl">Gestión de Sucursales</h1>
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
            <h3 className="text-lg font-semibold">{editingId ? 'Actualizar' : 'Agregar'} Sucursal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                id="nombre"
                type="text"
                placeholder="Nombre de la Sucursal"
                value={formState.nombre}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <textarea
                id="direccion"
                placeholder="Dirección de la Sucursal"
                value={formState.direccion}
                onChange={handleInputChange}
                className="border p-2 rounded"
              ></textarea>
            </div>
            <button
              onClick={createOrUpdateSucursal}
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              {editingId ? 'Actualizar' : 'Agregar'}
            </button>
          </div>

          {/* Tabla de sucursales */}
          <div className="bg-white rounded shadow-md overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Nombre</th>
                  <th className="border px-4 py-2">Dirección</th>
                  <th className="border px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sucursales.map((sucursal) => (
                  <tr key={sucursal.id}>
                    <td className="border px-4 py-2">{sucursal.nombre}</td>
                    <td className="border px-4 py-2">{sucursal.direccion}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => {
                          setEditingId(sucursal.id);
                          setFormState({
                            nombre: sucursal.nombre,
                            direccion: sucursal.direccion
                          });
                        }}
                        className="bg-yellow-500 text-white p-1 mr-2 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteSucursal(sucursal.id)}
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

export default Sucursales;

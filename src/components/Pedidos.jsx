import React, { useState, useEffect } from 'react';
import axios from '../api'; // Asegúrate de que axios esté configurado con la base URL correcta
import {  FaBars } from 'react-icons/fa';
import Sidebar from './SideBar'; // Asegúrate de tener un componente Sidebar

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [formState, setFormState] = useState({
    usuario_id: '',
    total: '',
    estado: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch de pedidos y usuarios
  useEffect(() => {
    fetchPedidos();
    fetchUsuarios();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await axios.get('/pedidos');
      setPedidos(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createOrUpdatePedido = async () => {
    try {
      if (editingId) {
        await axios.put(`/pedidos/${editingId}`, formState);
      } else {
        await axios.post('/pedidos', formState);
      }
      fetchPedidos();
      resetForm();
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const deletePedido = async (id) => {
    try {
      await axios.delete(`/pedidos/${id}`);
      fetchPedidos();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const resetForm = () => {
    setFormState({ usuario_id: '', total: '', estado: '' });
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
          <h1 className="text-2xl">Gestión de Pedidos</h1>
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
            <h3 className="text-lg font-semibold">{editingId ? 'Actualizar' : 'Agregar'} Pedido</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                id="usuario_id"
                value={formState.usuario_id}
                onChange={handleInputChange}
                className="border p-2 rounded"
              >
                <option value="">Seleccionar Usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre}
                  </option>
                ))}
              </select>

              <input
                id="total"
                type="number"
                placeholder="Total"
                value={formState.total}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />

              <select
                id="estado"
                value={formState.estado}
                onChange={handleInputChange}
                className="border p-2 rounded"
              >
                <option value="">Seleccionar Estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Completado">Completado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            <button
              onClick={createOrUpdatePedido}
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              {editingId ? 'Actualizar' : 'Agregar'}
            </button>
          </div>

          {/* Tabla de pedidos */}
          <div className="bg-white rounded shadow-md overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Usuario</th>
                  <th className="border px-4 py-2">Total</th>
                  <th className="border px-4 py-2">Estado</th>
                  <th className="border px-4 py-2">Fecha</th>
                  <th className="border px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td className="border px-4 py-2">{pedido.usuarioId}</td>
                    <td className="border px-4 py-2">${pedido.total}</td>
                    <td className="border px-4 py-2">{pedido.estado}</td>
                    <td className="border px-4 py-2">{new Date(pedido.fecha).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => {
                          setEditingId(pedido.id);
                          setFormState({
                            usuario_id: pedido.usuario_id,
                            total: pedido.total,
                            estado: pedido.estado,
                          });
                        }}
                        className="bg-yellow-500 text-white p-1 mr-2 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deletePedido(pedido.id)}
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

export default Pedidos;

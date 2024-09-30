import React, { useState, useEffect } from 'react';
import axios from '../api';
import { FaBars } from 'react-icons/fa';
import Sidebar from './SideBar';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formState, setFormState] = useState({
    nombre: '',
    email: '',
    rolId: '',   // Aquí usamos rolId en lugar de rol_id
    passwordHash: '' // Usamos passwordHash en lugar de password
  });
  const [editingId, setEditingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch de usuarios y roles
  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const createOrUpdateUsuario = async () => {
    try {
      if (editingId) {
        await axios.put(`/usuarios/${editingId}`, formState);
      } else {
        await axios.post('/usuarios', formState);
      }
      fetchUsuarios();
      resetForm();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const deleteUsuario = async (id) => {
    try {
      await axios.delete(`/usuarios/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const resetForm = () => {
    setFormState({ nombre: '', email: '', rolId: '', passwordHash: '' });
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };

  // Obtener el nombre del rol por su ID
  const getRolNombre = (rolId) => {
    const rol = roles.find((r) => r.id === rolId);
    return rol ? rol.nombre : 'Sin rol';
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
          <h1 className="text-2xl">Gestión de Usuarios</h1>
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
            <h3 className="text-lg font-semibold">{editingId ? 'Actualizar' : 'Crear'} Usuario</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                id="nombre"
                type="text"
                placeholder="Nombre"
                value={formState.nombre}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                id="email"
                type="email"
                placeholder="Correo"
                value={formState.email}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <select
                id="rolId"  // Aquí usamos rolId en lugar de rol_id
                value={formState.rolId}
                onChange={handleInputChange}
                className="border p-2 rounded"
              >
                <option value="">Seleccionar rol</option>
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.nombre}
                  </option>
                ))}
              </select>
              <input
                id="passwordHash"  // Aquí usamos passwordHash en lugar de password
                type="password"
                placeholder="Contraseña"
                value={formState.passwordHash}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
            </div>
            <button
              onClick={createOrUpdateUsuario}
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
          </div>

          {/* Tabla de usuarios */}
          <div className="bg-white rounded shadow-md overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Nombre</th>
                  <th className="border px-4 py-2">Correo</th>
                  <th className="border px-4 py-2">Rol</th>
                  <th className="border px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="border px-4 py-2">{usuario.nombre}</td>
                    <td className="border px-4 py-2">{usuario.email}</td>
                    <td className="border px-4 py-2">{getRolNombre(usuario.rolId)}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => {
                          setEditingId(usuario.id);
                          setFormState({
                            nombre: usuario.nombre,
                            email: usuario.email,
                            rolId: usuario.rolId,
                            passwordHash: ''
                          });
                        }}
                        className="bg-yellow-500 text-white p-1 mr-2 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteUsuario(usuario.id)}
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

export default Usuarios;

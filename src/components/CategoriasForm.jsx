import React, { useState, useEffect } from 'react';
import axios from '../api';
import { FaPlus, FaEdit, FaTrash, FaBars } from 'react-icons/fa';
import Sidebar from './SideBar'; // Importa el componente Sidebar

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [formState, setFormState] = useState({ nombre: '', descripcion: '' });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm] = useState('');
  const [sortConfig] = useState({ key: 'nombre', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    const response = await axios.get('/categorias');
    setCategorias(response.data);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.nombre) newErrors.nombre = 'Nombre es requerido';
    if (!formState.descripcion) newErrors.descripcion = 'Descripción es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };

  const resetForm = () => {
    setFormState({ nombre: '', descripcion: '' });
    setErrors({});
    setEditingId(null);
  };

  const createOrUpdateCategoria = async () => {
    if (validateForm()) {
      if (editingId) {
        await axios.put(`/categorias/${editingId}`, formState);
      } else {
        await axios.post('/categorias', formState);
      }
      fetchCategorias();
      resetForm();
    }
  };

  const confirmDeleteCategoria = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const deleteCategoria = async () => {
    if (deleteId) {
      await axios.delete(`/categorias/${deleteId}`);
      fetchCategorias();
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const sortedCategorias = [...categorias].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredCategorias = sortedCategorias.filter((categoria) =>
    categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategorias.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategorias.length / itemsPerPage);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : ''}`}>
        <header className="flex justify-between items-center bg-white p-4 shadow-md">
          <div className="text-2xl font-semibold text-gray-800">Gestión de Categorías</div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 focus:outline-none md:hidden">
              <FaBars />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Crear/Actualizar Categoría</h3>
            <div className="relative">
              <label htmlFor="nombre" className="text-gray-700">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre de la Categoría"
                value={formState.nombre}
                onChange={handleInputChange}
                className={`border p-3 rounded w-full ${errors.nombre ? 'border-red-500' : ''}`}
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            </div>
            <div className="relative mt-4">
              <label htmlFor="descripcion" className="text-gray-700">Descripción</label>
              <textarea
                id="descripcion"
                placeholder="Descripción de la Categoría"
                value={formState.descripcion}
                onChange={handleInputChange}
                className={`border p-3 rounded w-full ${errors.descripcion ? 'border-red-500' : ''}`}
              />
              {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={createOrUpdateCategoria}
                className={`p-3 rounded shadow-md transition duration-200 flex items-center ${editingId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
              >
                {editingId ? <FaEdit className="inline mr-2" /> : <FaPlus className="inline mr-2" />}
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider border border-gray-300">N°</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider border border-gray-300">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-600 uppercase tracking-wider border border-gray-300">Descripción</th>
                  <th className="px-6 py-3 text-right text-sm font-bold text-gray-600 uppercase tracking-wider border border-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentItems.map((categoria, index) => (
                  <tr key={categoria.id} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{categoria.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">{categoria.descripcion}</td>
                    <td className="px-6 py-4 text-right text-sm text-gray-700 border border-gray-300">
                      <div className="flex space-x-2 justify-end">
                        <button
                          onClick={() => {
                            setEditingId(categoria.id);
                            setFormState({ nombre: categoria.nombre, descripcion: categoria.descripcion });
                          }}
                          className="bg-yellow-500 text-white p-2 rounded shadow-md hover:bg-yellow-600 transition duration-200 flex items-center"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => confirmDeleteCategoria(categoria.id)}
                          className="bg-red-500 text-white p-2 rounded shadow-md hover:bg-red-600 transition duration-200 flex items-center"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-500 text-white p-3 rounded disabled:bg-gray-300 shadow-md hover:bg-gray-600 transition duration-200"
            >
              Anterior
            </button>
            <span className="text-lg">Página {currentPage} de {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-gray-500 text-white p-3 rounded disabled:bg-gray-300 shadow-md hover:bg-gray-600 transition duration-200"
            >
              Siguiente
            </button>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Confirmar Eliminación</h3>
                <p className="mb-4">¿Estás seguro de que deseas eliminar esta categoría?</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-500 text-white p-2 rounded mr-2 shadow-md hover:bg-gray-600 transition duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={deleteCategoria}
                    className="bg-red-500 text-white p-2 rounded shadow-md hover:bg-red-600 transition duration-200"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="bg-white p-4 text-center text-gray-500 shadow-inner text-lg">
          &copy; {new Date().getFullYear()} Gestión de Categorías. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default Categorias;

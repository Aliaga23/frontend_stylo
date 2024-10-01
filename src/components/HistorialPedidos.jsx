import React, { useState, useEffect } from 'react';
import axios from '../api'; // Asegúrate de tener axios configurado correctamente
import Navbar from './Navbar'; // Para la barra de navegación

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);  // Estado para almacenar los pedidos del usuario
  const [loading, setLoading] = useState(true);  // Estado para mostrar un spinner de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Obtener el ID del usuario desde localStorage
    const usuarioId = JSON.parse(localStorage.getItem('usuario')).id;
    
    // Obtener los pedidos del usuario
    const fetchPedidos = async () => {
      try {
        const response = await axios.get(`/pedidos?usuarioId=${usuarioId}`);  // Suponemos este endpoint
        setPedidos(response.data);  // Guardar los pedidos en el estado
        setLoading(false);  // Dejar de mostrar la carga
      } catch (error) {
        console.error('Error fetching pedidos:', error);
        setError('No se pudieron cargar los pedidos');
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) {
    return <p className="text-center">Cargando historial de pedidos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div>
      <Navbar />  {/* Barra de navegación */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Historial de Pedidos</h2>

        {/* Si no hay pedidos */}
        {pedidos.length === 0 ? (
          <p className="text-center">No has realizado ningún pedido todavía.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Pedido #{pedido.id}</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Total:</strong> ${pedido.total.toFixed(2)}
                </p>

                {/* Verificamos si el pedido tiene items antes de mapear */}
                {pedido.items && pedido.items.length > 0 ? (
                  <>
                    <h4 className="font-semibold text-lg mt-4 mb-2">Productos:</h4>
                    <ul className="list-disc list-inside">
                      {pedido.items.map((item) => (
                        <li key={item.id}>
                          {item.productoNombre} - Cantidad: {item.cantidad} - Precio: ${item.precioUnitario.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-gray-500">.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorialPedidos;

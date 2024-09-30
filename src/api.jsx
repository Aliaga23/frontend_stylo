import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendstylo-production.up.railway.app/api',  // Asegúrate de usar la URL correcta de tu backend
});

// Interceptor para agregar el token JWT a las cabeceras de cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtener el token de localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agregar el token en la cabecera de autorización
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

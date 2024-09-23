import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendstylo-production.up.railway.app/api/',  // Cambia esto a la URL de tu backend
});

export default api;

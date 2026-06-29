import axios from 'axios';

// Cria uma instância do axios com a URL base do seu futuro backend
// Assumindo que o backend via Express.js ou NestJS vai rodar na porta 3000
const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export default api;
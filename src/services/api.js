import axios from "axios";

const api = axios.create({
  baseURL: "https://salao-agendamentos.onrender.com"
});

export default api;

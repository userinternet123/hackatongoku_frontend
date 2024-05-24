import axios from 'axios';

const api = axios.create({baseURL: process.env.REACT_APP_API_URL});

export const login = async (userName, password) => {
  const response = await api.post('/auth', {"userName":userName,"password": password});
  console.log(response.data)
  return {"data":response.data,"status": response.status};
}

export const getLuchador = async (token) => {
  const response = await api.get('/torneo', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getLuchadorDetalle = async (luchador, token) => {
  const response = await api.get(`/inscripcion/${luchador}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

export default api;
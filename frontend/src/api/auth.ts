import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    email,
    password,
  });
  return response.data;
};

import { useState } from 'react';
import { loginUser, registerUser } from '../api/auth';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const token = await loginUser(email, password);
      if (token) {
        localStorage.setItem('token', token);
        window.location.href = '/';
        return true;
      }
    } catch (err: any) {
      setError(err.response.data.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await registerUser(email, password);
      if (response.ok) {
        localStorage.setItem('token', response.token);
        window.location.href = '/';
        return true;
      }
    } catch (err: any) {
      setError(err.response.data.message || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    isAuthenticated,
    handleRegister,
    loading,
    error,
  };
};

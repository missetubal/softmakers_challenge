import { useState } from 'react';
import { loginUser } from '../api/auth';

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

  return {
    handleLogin,
    loading,
    error,
  };
};

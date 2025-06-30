import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '@/components/custom/login';

export const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;

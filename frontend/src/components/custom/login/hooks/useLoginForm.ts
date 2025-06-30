import { useForm } from 'react-hook-form';
import {
  loginFormSchema,
  type LoginFormSchema,
} from '../schema/login-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';

export const useLoginForm = () => {
  const { handleLogin } = useAuth();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormSchema) => {
    const success = await handleLogin(values.email, values.password);
    if (success) {
      console.log('success');
    }
  };

  return {
    form,
    onSubmit,
  };
};

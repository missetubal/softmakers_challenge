import { useForm } from 'react-hook-form';
import {
  registerFormSchema,
  type RegisterFormSchema,
} from '../schema/register-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';

export const useRegisterForm = () => {
  const { handleRegister, error } = useAuth();
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterFormSchema) => {
    console.log(values);
    const success = await handleRegister(values.email, values.password);
    if (success) {
      console.log('success');
    }
  };

  return {
    form,
    onSubmit,
    error,
  };
};

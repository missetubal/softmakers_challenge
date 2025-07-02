import { RegisterForm } from '@/components/custom/register';

export const RegisterPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-y-5'>
      <h2 className='text-2xl font-bold text-center'>Register</h2>
      <RegisterForm />
      <p className='text-sm text-center mt-2'>
        Already have an account?{' '}
        <a href='/login' className='text-blue-600'>
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterPage;

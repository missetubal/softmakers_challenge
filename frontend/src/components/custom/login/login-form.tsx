import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { useLoginForm } from './hooks/useLoginForm';

export const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder='Email' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );

  // <form onSubmit={onSubmit}>
  //   <input
  //     type='email'
  //     name='email'
  //     placeholder='Email'
  //     value={form.getValues().email}
  //   />
  //   <input type='password' name='password' placeholder='Password' />
  //   <button type='submit' disabled={loading}>
  //     Login
  //   </button>
  // </form>;
};

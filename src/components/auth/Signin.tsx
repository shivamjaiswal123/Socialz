'use client';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SigninSchema } from '@/schemas';
import CardWrapper from '@/components/CardWrapper';
import DecarmationLine from '@/components/DemarcationLine';
import Social from '@/components/Social';

const Signin = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  type FormData = z.infer<typeof SigninSchema>;

  const onSubmit = (data: FormData) => {
    console.log('form data: ', data);
  };

  return (
    <CardWrapper
      header="Welcome Back"
      description="Please enter your details to sign in."
      instructionLabel="Don't have an account?"
      instructionHref="/signup"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full">Signup</Button>

          <DecarmationLine />
          <Social />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default Signin;

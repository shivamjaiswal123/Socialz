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
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import FormError from '@/components/form-error';
import { useState } from 'react';
import { Loader } from 'lucide-react';

type FormData = z.infer<typeof SigninSchema>;

const Signin = () => {
  const router = useRouter();
  const [error, setError] = useState<any>();
  const form = useForm<FormData>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signinHandler = async (data: FormData) => {
    setError('');
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!response?.ok) {
        setError(response?.error);
        return;
      }
      toast.success('You are logged in');
      router.push('/');
    } catch (error) {
      console.log('Error on signin in: ', error);
    }
  };

  return (
    <CardWrapper
      header="Welcome Back"
      description="Please enter your details to sign in."
      instructionLabel="Don't have an account?"
      instructionHref="/signup"
      instructionLink="Sign up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signinHandler)} className="space-y-4">
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
          <FormError message={error} />
          <Button className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                Signing in <Loader className="animate-spin" strokeWidth={3} />
              </>
            ) : (
              'Signin'
            )}
          </Button>

          <DecarmationLine />
          <Social />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default Signin;

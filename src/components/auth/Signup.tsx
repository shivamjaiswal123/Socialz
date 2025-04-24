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
import { SignupSchema } from '@/schemas';
import CardWrapper from '@/components/CardWrapper';
import DecarmationLine from '@/components/DemarcationLine';
import Social from '@/components/Social';
import { signup } from '@/actions/user.actions';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';

type FormData = z.infer<typeof SignupSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const signupHandler = async (data: FormData) => {
    try {
      const response = await signup(data);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      router.push('/signin');
    } catch (error) {
      console.log('Error in signing up: ', error);
    }
  };

  return (
    <CardWrapper
      header="Welcome to Socialz"
      description="Please enter your details to sign up."
      instructionLabel="Already have an account?"
      instructionHref="/signin"
      instructionLink="Sign in"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signupHandler)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      {...field}
                      className="pr-10"
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                Signing up
                <Loader className="animate-spin" strokeWidth={3} />
              </>
            ) : (
              'Create Account'
            )}
          </Button>

          <DecarmationLine />
          <Social />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default Signup;

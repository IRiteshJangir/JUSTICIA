import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/api';
import { setCredentials } from '../../features/authSlice';
import { toast } from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#080D10] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#11191D] rounded-xl shadow-2xl overflow-hidden border border-[#D99A32]/20">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-white tracking-wider mb-2">JUSTICIA</h1>
            <h2 className="text-[#D99A32] font-medium tracking-widest text-sm uppercase">Admin Portal</h2>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@justicia.com"
              {...register('email')}
              error={errors.email?.message}
              dark
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
              dark
            />
            
            <Button 
              type="submit" 
              className="w-full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

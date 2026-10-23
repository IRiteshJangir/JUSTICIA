import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetMeQuery, useChangePasswordMutation } from '../../services/api';
import { User, Mail, Shield, Key } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your new password')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ProfilePage = () => {
  const { data: userData, isLoading: isUserLoading } = useGetMeQuery();
  const [changePassword, { isLoading: isChanging }] = useChangePasswordMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(passwordSchema)
  });

  const onSubmit = async (data) => {
    try {
      await changePassword({ 
        currentPassword: data.currentPassword, 
        newPassword: data.newPassword 
      }).unwrap();
      
      toast.success('Password changed successfully');
      reset();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to change password');
    }
  };

  if (isUserLoading) return <div className="p-12 flex justify-center"><LoadingSpinner /></div>;

  const user = userData?.data || { name: 'Admin User', email: 'admin@justicia.com', role: 'admin' };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif text-[#252525] font-bold">Admin Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account settings and password</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <Card className="p-6 shadow-sm border-gray-100 bg-white md:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-[#11191D] text-[#D99A32] rounded-full flex items-center justify-center text-3xl font-serif font-bold mb-4 shadow-inner">
              {user.name?.charAt(0) || 'A'}
            </div>
            <h2 className="text-xl font-bold text-[#252525]">{user.name}</h2>
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium mt-2 mb-6 capitalize">
              <Shield size={12} /> {user.role}
            </div>
            
            <div className="w-full space-y-3 text-left border-t border-gray-100 pt-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <User size={16} className="text-gray-400" />
                <span>{user.name}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={16} className="text-gray-400" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Change Password Card */}
        <Card className="p-6 shadow-sm border-gray-100 bg-white md:col-span-2">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Key className="text-[#D99A32]" size={20} />
            <h2 className="text-lg font-bold text-[#252525]">Change Password</h2>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input 
              label="Current Password" 
              type="password" 
              {...register('currentPassword')} 
              error={errors.currentPassword?.message} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input 
                label="New Password" 
                type="password" 
                {...register('newPassword')} 
                error={errors.newPassword?.message} 
              />
              <Input 
                label="Confirm New Password" 
                type="password" 
                {...register('confirmPassword')} 
                error={errors.confirmPassword?.message} 
              />
            </div>
            
            <div className="pt-2 flex justify-end">
              <Button type="submit" isLoading={isChanging}>
                Update Password
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;

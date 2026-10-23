import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

const settingsSchema = z.object({
  siteName: z.string().min(2, 'Site name is required'),
  tagline: z.string().optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  contact: z.object({
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    workingHours: z.string().optional(),
    mapEmbedUrl: z.string().optional()
  }).optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
    youtube: z.string().optional()
  }).optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.string().optional()
  }).optional(),
  statistics: z.object({
    experience: z.preprocess(val => (val === '' ? undefined : Number(val)), z.number().optional()),
    casesWon: z.preprocess(val => (val === '' ? undefined : Number(val)), z.number().optional()),
    successRate: z.preprocess(val => (val === '' ? undefined : Number(val)), z.number().optional()),
    happyClients: z.preprocess(val => (val === '' ? undefined : Number(val)), z.number().optional())
  }).optional()
});

const SettingsPage = () => {
  const { data, isLoading } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateSettingsMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(settingsSchema)
  });

  useEffect(() => {
    if (data?.data) {
      const s = data.data;
      reset({
        siteName: s.siteName || '',
        tagline: s.tagline || '',
        logo: s.logo || '',
        favicon: s.favicon || '',
        contact: {
          address: s.contact?.address || '',
          phone: s.contact?.phone || '',
          email: s.contact?.email || '',
          workingHours: s.contact?.workingHours || '',
          mapEmbedUrl: s.contact?.mapEmbedUrl || ''
        },
        socialLinks: {
          facebook: s.socialLinks?.facebook || '',
          twitter: s.socialLinks?.twitter || '',
          linkedin: s.socialLinks?.linkedin || '',
          instagram: s.socialLinks?.instagram || '',
          youtube: s.socialLinks?.youtube || ''
        },
        seo: {
          title: s.seo?.title || '',
          description: s.seo?.description || '',
          keywords: Array.isArray(s.seo?.keywords) ? s.seo.keywords.join(', ') : (s.seo?.keywords || '')
        },
        statistics: {
          experience: s.statistics?.experience ?? 15,
          casesWon: s.statistics?.casesWon ?? 500,
          successRate: s.statistics?.successRate ?? 98,
          happyClients: s.statistics?.happyClients ?? 1000
        }
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        seo: {
          ...formData.seo,
          keywords: formData.seo?.keywords ? formData.seo.keywords.split(',').map(k => k.trim()).filter(Boolean) : []
        }
      };
      await updateSettings(payload).unwrap();
      toast.success('Settings updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update settings');
    }
  };

  if (isLoading) return <div className="p-12 flex justify-center"><LoadingSpinner /></div>;

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-[#252525] font-bold">Website Settings</h1>
        <Button onClick={handleSubmit(onSubmit)} isLoading={isUpdating} className="flex items-center gap-2">
          <Save size={18} /> Save Settings
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6 shadow-sm border-gray-100 bg-white">
          <h2 className="text-lg font-bold text-[#252525] mb-4 border-b pb-2">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Site Name" {...register('siteName')} error={errors.siteName?.message} />
            <Input label="Tagline" {...register('tagline')} />
            <Input label="Logo URL" {...register('logo')} />
            <Input label="Favicon URL" {...register('favicon')} />
          </div>
        </Card>

        <Card className="p-6 shadow-sm border-gray-100 bg-white">
          <h2 className="text-lg font-bold text-[#252525] mb-4 border-b pb-2">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Email Address" type="email" {...register('contact.email')} error={errors.contact?.email?.message} />
            <Input label="Phone Number" {...register('contact.phone')} />
            <div className="md:col-span-2">
              <TextArea label="Physical Address" rows={2} {...register('contact.address')} />
            </div>
            <Input label="Working Hours" placeholder="e.g. Mon - Sat: 9:00 AM - 7:00 PM" {...register('contact.workingHours')} />
            <Input label="Google Maps Embed URL" {...register('contact.mapEmbedUrl')} />
          </div>
        </Card>

        <Card className="p-6 shadow-sm border-gray-100 bg-white">
          <h2 className="text-lg font-bold text-[#252525] mb-4 border-b pb-2">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="LinkedIn URL" {...register('socialLinks.linkedin')} />
            <Input label="Twitter URL" {...register('socialLinks.twitter')} />
            <Input label="Facebook URL" {...register('socialLinks.facebook')} />
            <Input label="Instagram URL" {...register('socialLinks.instagram')} />
            <Input label="YouTube URL" {...register('socialLinks.youtube')} />
          </div>
        </Card>

        <Card className="p-6 shadow-sm border-gray-100 bg-white">
          <h2 className="text-lg font-bold text-[#252525] mb-4 border-b pb-2">Statistics (Shown on Homepage & About)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Input label="Years Experience" type="number" {...register('statistics.experience')} />
            <Input label="Cases Won" type="number" {...register('statistics.casesWon')} />
            <Input label="Success Rate (%)" type="number" {...register('statistics.successRate')} />
            <Input label="Happy Clients" type="number" {...register('statistics.happyClients')} />
          </div>
        </Card>

        <Card className="p-6 shadow-sm border-gray-100 bg-white">
          <h2 className="text-lg font-bold text-[#252525] mb-4 border-b pb-2">Default SEO Settings</h2>
          <div className="space-y-4">
            <Input label="Global Meta Title" {...register('seo.title')} />
            <TextArea label="Global Meta Description" rows={2} {...register('seo.description')} />
            <Input label="Global Meta Keywords (comma separated)" {...register('seo.keywords')} />
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SettingsPage;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  useGetAdminTeamQuery, 
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation
} from '../../services/api';
import { Edit2, Trash2, Plus } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import toast from 'react-hot-toast';

const ImageUpload = ({ value, onChange, label }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input 
      type="text" className="w-full px-3 py-2 border rounded-md text-sm"
      placeholder="Enter image URL" value={value || ''} onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const teamSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  designation: z.string().min(2, 'Designation is required'),
  specialization: z.string().optional(),
  experience: z.string().optional(),
  biography: z.string().optional(),
  image: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    email: z.string().optional()
  }).optional(),
  order: z.preprocess((val) => Number(val), z.number()),
  isPublished: z.boolean().default(true)
});

const TeamManagePage = () => {
  const { data, isLoading, refetch } = useGetAdminTeamQuery();
  const [createTeamMember, { isLoading: isCreating }] = useCreateTeamMemberMutation();
  const [updateTeamMember, { isLoading: isUpdating }] = useUpdateTeamMemberMutation();
  const [deleteTeamMember, { isLoading: isDeleting }] = useDeleteTeamMemberMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const teamMembers = data?.data || [];

  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: { order: 0, isPublished: true, socialLinks: {} }
  });

  const image = watch('image');

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({ 
      name: '', designation: '', specialization: '', experience: '', 
      biography: '', image: '', socialLinks: { facebook: '', twitter: '', linkedin: '', email: '' }, 
      order: 0, isPublished: true 
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    reset({ 
      name: item.name, designation: item.designation, specialization: item.specialization,
      experience: item.experience, biography: item.biography, image: item.image,
      socialLinks: item.socialLinks || { facebook: '', twitter: '', linkedin: '', email: '' },
      order: item.order, isPublished: item.isPublished 
    });
    setModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateTeamMember({ id: editingItem._id, ...formData }).unwrap();
        toast.success('Team member updated');
      } else {
        await createTeamMember(formData).unwrap();
        toast.success('Team member created');
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-[#252525] font-bold">Team Members</h1>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2">
          <Plus size={18} /> Add Member
        </Button>
      </div>

      {isLoading ? (
        <div className="p-8 flex justify-center"><LoadingSpinner /></div>
      ) : teamMembers.length === 0 ? (
        <EmptyState title="No team members found" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map(item => (
            <Card key={item._id} className="p-6 flex flex-col items-center text-center relative hover:shadow-md transition-shadow">
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => handleOpenEdit(item)} className="p-1.5 bg-white text-blue-600 hover:bg-blue-50 rounded-full shadow-sm border border-gray-100">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => { setItemToDelete(item._id); setDeleteDialogOpen(true); }} className="p-1.5 bg-white text-red-600 hover:bg-red-50 rounded-full shadow-sm border border-gray-100">
                  <Trash2 size={14} />
                </button>
              </div>
              
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-[#D99A32]/30">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400">
                    {item.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <h3 className="font-bold text-[#252525] text-lg">{item.name}</h3>
              <p className="text-[#D99A32] text-sm font-medium mb-1">{item.designation}</p>
              <p className="text-gray-500 text-xs mb-4">{item.specialization}</p>
              
              <div className="mt-auto w-full pt-4 border-t border-gray-100 flex justify-between items-center">
                <Badge variant={item.isPublished ? 'success' : 'secondary'} size="sm">
                  {item.isPublished ? 'Published' : 'Draft'}
                </Badge>
                <span className="text-xs text-gray-400">Order: {item.order}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Member' : 'Add Member'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" {...register('name')} error={errors.name?.message} />
            <Input label="Designation (e.g. Senior Partner)" {...register('designation')} error={errors.designation?.message} />
            <Input label="Specialization" {...register('specialization')} />
            <Input label="Years Experience" {...register('experience')} />
          </div>
          
          <TextArea label="Biography" rows={4} {...register('biography')} />
          
          <ImageUpload label="Profile Image URL" value={image} onChange={(val) => setValue('image', val)} />
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-md font-medium text-gray-900 mb-2">Social Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input label="LinkedIn URL" {...register('socialLinks.linkedin')} />
              <Input label="Twitter URL" {...register('socialLinks.twitter')} />
              <Input label="Facebook URL" {...register('socialLinks.facebook')} />
              <Input label="Email Address" type="email" {...register('socialLinks.email')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input label="Display Order" type="number" {...register('order')} />
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" id="teamIsPublished" {...register('isPublished')} className="w-4 h-4 text-[#D99A32] rounded"/>
              <label htmlFor="teamIsPublished" className="text-sm font-medium text-gray-700">Published</label>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={isCreating || isUpdating}>{editingItem ? 'Save Changes' : 'Create'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} 
        onConfirm={async () => {
          try {
            await deleteTeamMember(itemToDelete).unwrap(); toast.success('Deleted'); setDeleteDialogOpen(false); refetch();
          } catch(err) { toast.error('Failed'); }
        }}
        title="Delete Team Member" message="Are you sure?" isLoading={isDeleting}
      />
    </div>
  );
};

export default TeamManagePage;

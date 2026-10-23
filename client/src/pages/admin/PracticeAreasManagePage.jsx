import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  useGetAdminPracticeAreasQuery, 
  useCreatePracticeAreaMutation,
  useUpdatePracticeAreaMutation,
  useDeletePracticeAreaMutation
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

const practiceAreaSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  shortDescription: z.string().min(10, 'Short description is required'),
  description: z.string().min(20, 'Detailed description is required'),
  icon: z.string().min(1, 'Icon is required'),
  order: z.preprocess((val) => Number(val), z.number()),
  isPublished: z.boolean().default(true)
});

const iconOptions = [
  'Scale', 'Briefcase', 'Shield', 'BookOpen', 'FileText', 'Building', 'Users', 'Home', 'Car'
];

const PracticeAreasManagePage = () => {
  const { data, isLoading, refetch } = useGetAdminPracticeAreasQuery();
  const [createArea, { isLoading: isCreating }] = useCreatePracticeAreaMutation();
  const [updateArea, { isLoading: isUpdating }] = useUpdatePracticeAreaMutation();
  const [deleteArea, { isLoading: isDeleting }] = useDeletePracticeAreaMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const practiceAreas = data?.data || [];

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(practiceAreaSchema),
    defaultValues: {
      order: 0,
      isPublished: true,
      icon: 'Scale'
    }
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({
      title: '',
      shortDescription: '',
      description: '',
      icon: 'Scale',
      order: 0,
      isPublished: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    reset({
      title: item.title,
      shortDescription: item.shortDescription,
      description: item.description,
      icon: item.icon,
      order: item.order,
      isPublished: item.isPublished
    });
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateArea({ id: editingItem._id, ...formData }).unwrap();
        toast.success('Practice area updated successfully');
      } else {
        await createArea(formData).unwrap();
        toast.success('Practice area created successfully');
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Operation failed');
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteArea(itemToDelete).unwrap();
      toast.success('Practice area deleted successfully');
      setDeleteDialogOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to delete practice area');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-[#252525] font-bold">Practice Areas</h1>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2">
          <Plus size={18} /> Add Practice Area
        </Button>
      </div>

      <Card className="shadow-sm border-gray-100 bg-white overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><LoadingSpinner /></div>
        ) : practiceAreas.length === 0 ? (
          <EmptyState title="No practice areas found" message="Create your first practice area to display on the website." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-gray-500 text-sm">
                  <th className="p-4 font-medium">Title & Desc</th>
                  <th className="p-4 font-medium">Icon</th>
                  <th className="p-4 font-medium">Order</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {practiceAreas.map(item => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-medium text-[#252525]">{item.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{item.shortDescription}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{item.icon}</td>
                    <td className="p-4 text-sm text-gray-600">{item.order}</td>
                    <td className="p-4">
                      <Badge variant={item.isPublished ? 'success' : 'secondary'}>
                        {item.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDeleteClick(item._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editingItem ? 'Edit Practice Area' : 'Add Practice Area'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Title" {...register('title')} error={errors.title?.message} />
          
          <Input label="Short Description (for cards)" {...register('shortDescription')} error={errors.shortDescription?.message} />
          
          <TextArea 
            label="Detailed Description" 
            rows={5} 
            {...register('description')} 
            error={errors.description?.message} 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
              <select 
                {...register('icon')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D99A32] focus:border-[#D99A32]"
              >
                {iconOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.icon && <p className="mt-1 text-sm text-red-600">{errors.icon.message}</p>}
            </div>
            
            <Input label="Display Order" type="number" {...register('order')} error={errors.order?.message} />
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <input 
              type="checkbox" 
              id="isPublished" 
              {...register('isPublished')} 
              className="w-4 h-4 text-[#D99A32] rounded focus:ring-[#D99A32]"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">Published</label>
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={isCreating || isUpdating}>
              {editingItem ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Practice Area"
        message="Are you sure you want to delete this practice area? This might break existing case studies linked to it."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default PracticeAreasManagePage;

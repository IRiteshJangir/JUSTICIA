import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  useGetBlogCategoriesQuery, 
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation
} from '../../services/api';
import { Edit2, Trash2, Plus } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import toast from 'react-hot-toast';

const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional()
});

const BlogCategoriesManagePage = () => {
  const { data, isLoading, refetch } = useGetBlogCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateBlogCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateBlogCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteBlogCategoryMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const categories = data?.data || [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(categorySchema)
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({ name: '', description: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    reset({ name: item.name, description: item.description || '' });
    setModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateCategory({ id: editingItem._id, ...formData }).unwrap();
        toast.success('Category updated successfully');
      } else {
        await createCategory(formData).unwrap();
        toast.success('Category created successfully');
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Operation failed');
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(itemToDelete).unwrap();
      toast.success('Category deleted successfully');
      setDeleteDialogOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-[#252525] font-bold">Blog Categories</h1>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2">
          <Plus size={18} /> Add Category
        </Button>
      </div>

      <Card className="shadow-sm border-gray-100 bg-white overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><LoadingSpinner /></div>
        ) : categories.length === 0 ? (
          <EmptyState title="No categories found" message="Create a category to organize your blog posts." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-gray-500 text-sm">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Slug</th>
                  <th className="p-4 font-medium">Description</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(item => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium text-[#252525]">{item.name}</td>
                    <td className="p-4 text-sm text-gray-600">{item.slug}</td>
                    <td className="p-4 text-sm text-gray-600 truncate max-w-xs">{item.description || '-'}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => { setItemToDelete(item._id); setDeleteDialogOpen(true); }} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Category' : 'Add Category'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Name" {...register('name')} error={errors.name?.message} />
          <TextArea label="Description (Optional)" rows={3} {...register('description')} error={errors.description?.message} />
          
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={isCreating || isUpdating}>
              {editingItem ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={confirmDelete}
        title="Delete Category" message="Are you sure you want to delete this category? Blogs linked to this category may lose their categorization."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default BlogCategoriesManagePage;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  useGetAdminFaqsQuery, 
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation
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

const faqSchema = z.object({
  question: z.string().min(5, 'Question is required'),
  answer: z.string().min(10, 'Answer is required'),
  category: z.string().min(2, 'Category is required'),
  order: z.preprocess((val) => Number(val), z.number()),
  isPublished: z.boolean().default(true)
});

const FAQsManagePage = () => {
  const { data, isLoading, refetch } = useGetAdminFaqsQuery();
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const faqs = data?.data || [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: { order: 0, isPublished: true, category: 'General' }
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({ question: '', answer: '', category: 'General', order: 0, isPublished: true });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    reset({ 
      question: item.question, answer: item.answer, 
      category: item.category, order: item.order, isPublished: item.isPublished 
    });
    setModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateFaq({ id: editingItem._id, ...formData }).unwrap();
        toast.success('FAQ updated');
      } else {
        await createFaq(formData).unwrap();
        toast.success('FAQ created');
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Operation failed');
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteFaq(itemToDelete).unwrap();
      toast.success('FAQ deleted');
      setDeleteDialogOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-[#252525] font-bold">FAQs</h1>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2">
          <Plus size={18} /> Add FAQ
        </Button>
      </div>

      <Card className="shadow-sm border-gray-100 bg-white">
        {isLoading ? (
          <div className="p-8 flex justify-center"><LoadingSpinner /></div>
        ) : faqs.length === 0 ? (
          <EmptyState title="No FAQs found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-gray-500 text-sm">
                  <th className="p-4 font-medium">Question</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Order</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map(item => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium text-[#252525] max-w-md truncate">{item.question}</td>
                    <td className="p-4 text-sm text-gray-600">{item.category}</td>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit FAQ' : 'Add FAQ'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Question" {...register('question')} error={errors.question?.message} />
          <TextArea label="Answer" rows={4} {...register('answer')} error={errors.answer?.message} />
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Category (e.g. General, Billing)" {...register('category')} error={errors.category?.message} />
            <Input label="Order" type="number" {...register('order')} error={errors.order?.message} />
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="faqIsPublished" {...register('isPublished')} className="w-4 h-4 text-[#D99A32] rounded"/>
            <label htmlFor="faqIsPublished" className="text-sm font-medium text-gray-700">Published</label>
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={isCreating || isUpdating}>{editingItem ? 'Save Changes' : 'Create'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={confirmDelete}
        title="Delete FAQ" message="Are you sure?" isLoading={isDeleting}
      />
    </div>
  );
};

export default FAQsManagePage;

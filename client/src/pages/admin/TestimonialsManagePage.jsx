import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  useGetAdminTestimonialsQuery, 
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation
} from '../../services/api';
import { Edit2, Trash2, Plus, Star } from 'lucide-react';
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

const testimonialSchema = z.object({
  clientName: z.string().min(2, 'Client name is required'),
  designation: z.string().optional(),
  content: z.string().min(10, 'Content is required'),
  rating: z.preprocess((val) => Number(val), z.number().min(1).max(5)),
  avatar: z.string().optional(),
  order: z.preprocess((val) => Number(val), z.number()),
  isPublished: z.boolean().default(true)
});

const TestimonialsManagePage = () => {
  const { data, isLoading, refetch } = useGetAdminTestimonialsQuery();
  const [createTestimonial, { isLoading: isCreating }] = useCreateTestimonialMutation();
  const [updateTestimonial, { isLoading: isUpdating }] = useUpdateTestimonialMutation();
  const [deleteTestimonial, { isLoading: isDeleting }] = useDeleteTestimonialMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const testimonials = data?.data || [];

  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { rating: 5, order: 0, isPublished: true }
  });

  const avatar = watch('avatar');

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({ clientName: '', designation: '', content: '', rating: 5, avatar: '', order: 0, isPublished: true });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    reset({ 
      clientName: item.clientName, designation: item.designation, content: item.content,
      rating: item.rating, avatar: item.avatar, order: item.order, isPublished: item.isPublished 
    });
    setModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateTestimonial({ id: editingItem._id, ...formData }).unwrap();
        toast.success('Testimonial updated');
      } else {
        await createTestimonial(formData).unwrap();
        toast.success('Testimonial created');
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} size={14} className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-[#252525] font-bold">Testimonials</h1>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2">
          <Plus size={18} /> Add Testimonial
        </Button>
      </div>

      {isLoading ? (
        <div className="p-8 flex justify-center"><LoadingSpinner /></div>
      ) : testimonials.length === 0 ? (
        <EmptyState title="No testimonials found" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(item => (
            <Card key={item._id} className="p-6 flex flex-col h-full relative">
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => handleOpenEdit(item)} className="p-1.5 bg-white text-blue-600 hover:bg-blue-50 rounded-full shadow-sm border border-gray-100">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => { setItemToDelete(item._id); setDeleteDialogOpen(true); }} className="p-1.5 bg-white text-red-600 hover:bg-red-50 rounded-full shadow-sm border border-gray-100">
                  <Trash2 size={14} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.clientName} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#D99A32]/20 flex items-center justify-center text-[#D99A32] font-bold text-lg">
                    {item.clientName.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-[#252525]">{item.clientName}</h3>
                  <p className="text-xs text-gray-500">{item.designation}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {renderStars(item.rating)}
              </div>
              
              <p className="text-gray-600 text-sm flex-grow italic">"{item.content}"</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <Badge variant={item.isPublished ? 'success' : 'secondary'} size="sm">
                  {item.isPublished ? 'Published' : 'Draft'}
                </Badge>
                <span className="text-xs text-gray-400">Order: {item.order}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Client Name" {...register('clientName')} error={errors.clientName?.message} />
            <Input label="Designation (e.g. CEO, Acme Corp)" {...register('designation')} />
          </div>
          
          <TextArea label="Testimonial Content" rows={4} {...register('content')} error={errors.content?.message} />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
              <select {...register('rating')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D99A32]">
                <option value="5">5 Stars</option><option value="4">4 Stars</option>
                <option value="3">3 Stars</option><option value="2">2 Stars</option><option value="1">1 Star</option>
              </select>
            </div>
            <Input label="Display Order" type="number" {...register('order')} />
          </div>
          
          <ImageUpload label="Avatar URL" value={avatar} onChange={(val) => setValue('avatar', val)} />
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="testIsPublished" {...register('isPublished')} className="w-4 h-4 text-[#D99A32] rounded"/>
            <label htmlFor="testIsPublished" className="text-sm font-medium text-gray-700">Published</label>
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
            await deleteTestimonial(itemToDelete).unwrap(); toast.success('Deleted'); setDeleteDialogOpen(false); refetch();
          } catch(err) { toast.error('Failed'); }
        }}
        title="Delete Testimonial" message="Are you sure?" isLoading={isDeleting}
      />
    </div>
  );
};

export default TestimonialsManagePage;

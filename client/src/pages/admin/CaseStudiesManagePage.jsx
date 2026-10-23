import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  useGetAdminCaseStudiesQuery, 
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  useDeleteCaseStudyMutation,
  useGetAdminPracticeAreasQuery
} from '../../services/api';
import { Edit2, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Pagination from '../../components/ui/Pagination';
import toast from 'react-hot-toast';
import { formatDate } from '../../utils/helpers';

// Stub for ImageUpload component
const ImageUpload = ({ value, onChange, label }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
      <ImageIcon className="text-gray-400 mb-2" size={32} />
      <p className="text-sm text-gray-500">Click to upload image URL (mock)</p>
      <input 
        type="text" 
        className="mt-2 w-full px-3 py-1 border rounded text-sm"
        placeholder="Enter image URL for now"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

const caseStudySchema = z.object({
  title: z.string().min(5, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  content: z.string().min(20, 'Detailed content is required'),
  category: z.string().min(2, 'Category is required'),
  outcome: z.string().min(2, 'Outcome is required'),
  practiceArea: z.string().min(1, 'Practice Area is required'),
  featuredImage: z.string().optional(),
  isPublished: z.boolean().default(true)
});

const CaseStudiesManagePage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetAdminCaseStudiesQuery({ page, limit: 10 });
  const { data: areasData } = useGetAdminPracticeAreasQuery();
  
  const [createCaseStudy, { isLoading: isCreating }] = useCreateCaseStudyMutation();
  const [updateCaseStudy, { isLoading: isUpdating }] = useUpdateCaseStudyMutation();
  const [deleteCaseStudy, { isLoading: isDeleting }] = useDeleteCaseStudyMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const caseStudies = data?.data?.caseStudies || [];
  const totalPages = data?.data?.totalPages || 1;
  const practiceAreas = areasData?.data || [];

  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(caseStudySchema),
    defaultValues: { isPublished: true }
  });

  const featuredImage = watch('featuredImage');

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({
      title: '', description: '', content: '', category: '', 
      outcome: '', practiceArea: '', featuredImage: '', isPublished: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    reset({
      title: item.title, description: item.description, content: item.content,
      category: item.category, outcome: item.outcome, 
      practiceArea: item.practiceArea?._id || item.practiceArea,
      featuredImage: item.featuredImage, isPublished: item.isPublished
    });
    setModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateCaseStudy({ id: editingItem._id, ...formData }).unwrap();
        toast.success('Case study updated');
      } else {
        await createCaseStudy(formData).unwrap();
        toast.success('Case study created');
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Operation failed');
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteCaseStudy(itemToDelete).unwrap();
      toast.success('Case study deleted');
      setDeleteDialogOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-[#252525] font-bold">Case Studies</h1>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2">
          <Plus size={18} /> Add Case Study
        </Button>
      </div>

      <Card className="shadow-sm border-gray-100 bg-white">
        {isLoading ? (
          <div className="p-8 flex justify-center"><LoadingSpinner /></div>
        ) : caseStudies.length === 0 ? (
          <EmptyState title="No case studies" />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-gray-500 text-sm">
                    <th className="p-4 font-medium">Title & Category</th>
                    <th className="p-4 font-medium">Outcome</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {caseStudies.map(item => (
                    <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-medium text-[#252525]">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-600 font-medium">{item.outcome}</td>
                      <td className="p-4 text-sm text-gray-600">{formatDate(item.createdAt)}</td>
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
            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-100">
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Case Study' : 'Add Case Study'} size="xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
          <Input label="Title" {...register('title')} error={errors.title?.message} />
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Category (e.g. Corporate Law)" {...register('category')} error={errors.category?.message} />
            <Input label="Outcome (e.g. $2.5M Settlement)" {...register('outcome')} error={errors.outcome?.message} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Practice Area</label>
            <select 
              {...register('practiceArea')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D99A32]"
            >
              <option value="">Select a practice area</option>
              {practiceAreas.map(area => (
                <option key={area._id} value={area._id}>{area.title}</option>
              ))}
            </select>
            {errors.practiceArea && <p className="mt-1 text-sm text-red-600">{errors.practiceArea.message}</p>}
          </div>

          <TextArea label="Short Description" rows={3} {...register('description')} error={errors.description?.message} />
          <TextArea label="Full Case Study Content" rows={8} {...register('content')} error={errors.content?.message} />
          
          <ImageUpload label="Featured Image" value={featuredImage} onChange={(val) => setValue('featuredImage', val)} />
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="csIsPublished" {...register('isPublished')} className="w-4 h-4 text-[#D99A32] rounded focus:ring-[#D99A32]"/>
            <label htmlFor="csIsPublished" className="text-sm font-medium text-gray-700">Published</label>
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-4">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={isCreating || isUpdating}>{editingItem ? 'Save Changes' : 'Create'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={confirmDelete}
        title="Delete Case Study" message="Are you sure?" isLoading={isDeleting}
      />
    </div>
  );
};

export default CaseStudiesManagePage;

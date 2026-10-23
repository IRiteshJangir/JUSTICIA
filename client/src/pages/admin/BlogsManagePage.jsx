import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  useGetAdminBlogsQuery, 
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogCategoriesQuery
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
import Pagination from '../../components/ui/Pagination';
import toast from 'react-hot-toast';
import { formatDate } from '../../utils/helpers';

const ImageUpload = ({ value, onChange, label }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input 
      type="text" 
      className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#D99A32]"
      placeholder="Enter image URL"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const blogSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  excerpt: z.string().min(10, 'Excerpt is required'),
  content: z.string().min(20, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().optional(),
  featuredImage: z.string().optional(),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: z.enum(['draft', 'published']).default('draft')
});

const BlogsManagePage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetAdminBlogsQuery({ page, limit: 10 });
  const { data: categoriesData } = useGetBlogCategoriesQuery();
  
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const blogs = data?.data?.blogs || [];
  const totalPages = data?.data?.totalPages || 1;
  const categories = categoriesData?.data || [];

  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: { status: 'draft' }
  });

  const featuredImage = watch('featuredImage');

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({
      title: '', excerpt: '', content: '', category: '', tags: '',
      featuredImage: '', seoTitle: '', metaDescription: '', status: 'draft'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    reset({
      title: item.title, excerpt: item.excerpt, content: item.content,
      category: item.category?._id || item.category, 
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags,
      featuredImage: item.featuredImage, seoTitle: item.seoTitle, 
      metaDescription: item.metaDescription, status: item.status
    });
    setModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      // transform tags string to array
      const payload = { 
        ...formData, 
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
      };
      
      if (editingItem) {
        await updateBlog({ id: editingItem._id, ...payload }).unwrap();
        toast.success('Blog post updated');
      } else {
        await createBlog(payload).unwrap();
        toast.success('Blog post created');
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Operation failed');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif text-[#252525] font-bold">Blog Posts</h1>
        <Button onClick={handleOpenAdd} className="flex items-center gap-2">
          <Plus size={18} /> Add Blog Post
        </Button>
      </div>

      <Card className="shadow-sm border-gray-100 bg-white">
        {isLoading ? (
          <div className="p-8 flex justify-center"><LoadingSpinner /></div>
        ) : blogs.length === 0 ? (
          <EmptyState title="No blog posts found" />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-gray-500 text-sm">
                    <th className="p-4 font-medium">Title & Category</th>
                    <th className="p-4 font-medium">Reading Time</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map(item => (
                    <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-medium text-[#252525]">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.category?.name || 'Uncategorized'}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{item.readingTime} min</td>
                      <td className="p-4 text-sm text-gray-600">{formatDate(item.createdAt)}</td>
                      <td className="p-4">
                        <Badge variant={item.status === 'published' ? 'success' : 'warning'}>
                          {item.status}
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Blog Post' : 'Add Blog Post'} size="xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
          <Input label="Title" {...register('title')} error={errors.title?.message} />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select {...register('category')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D99A32]">
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select {...register('status')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D99A32]">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <TextArea label="Excerpt" rows={2} {...register('excerpt')} error={errors.excerpt?.message} />
          <TextArea label="Content" rows={10} {...register('content')} error={errors.content?.message} />
          <Input label="Tags (comma separated)" {...register('tags')} />
          <ImageUpload label="Featured Image URL" value={featuredImage} onChange={(val) => setValue('featuredImage', val)} />
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-md font-medium text-gray-900 mb-2">SEO Settings (Optional)</h3>
            <Input label="SEO Title" {...register('seoTitle')} />
            <TextArea label="Meta Description" rows={2} {...register('metaDescription')} />
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-4">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={isCreating || isUpdating}>{editingItem ? 'Save Changes' : 'Create'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} 
        onConfirm={async () => {
          try {
            await deleteBlog(itemToDelete).unwrap();
            toast.success('Blog deleted');
            setDeleteDialogOpen(false);
            refetch();
          } catch(err) { toast.error('Failed to delete'); }
        }}
        title="Delete Blog Post" message="Are you sure?" isLoading={isDeleting}
      />
    </div>
  );
};

export default BlogsManagePage;

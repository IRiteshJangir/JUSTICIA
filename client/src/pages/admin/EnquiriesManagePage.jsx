import React, { useState } from 'react';
import { 
  useGetContactsQuery, 
  useUpdateContactStatusMutation, 
  useDeleteContactMutation 
} from '../../services/api';
import { Eye, Trash2, Search } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Button from '../../components/ui/Button';
import TextArea from '../../components/ui/TextArea';
import { formatDate, getStatusColor } from '../../utils/helpers';
import toast from 'react-hot-toast';

const EnquiriesManagePage = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [statusToUpdate, setStatusToUpdate] = useState('');
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const { data, isLoading, refetch } = useGetContactsQuery({ 
    page, limit: 10, status: statusFilter, search: searchTerm
  });
  
  const [updateStatus, { isLoading: isUpdating }] = useUpdateContactStatusMutation();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const enquiries = data?.data?.contacts || [];
  const totalPages = data?.data?.totalPages || 1;
  const stats = data?.data?.stats || { total: 0, new: 0, read: 0, responded: 0 };

  const handleView = (item) => {
    setSelectedItem(item);
    setAdminNotes(item.adminNotes || '');
    setStatusToUpdate(item.status);
    setViewModalOpen(true);
    // Mark as read automatically if it's new
    if (item.status === 'new') {
      updateStatus({ id: item._id, status: 'read', adminNotes: item.adminNotes }).unwrap().then(() => refetch()).catch(() => {});
    }
  };

  const handleUpdate = async () => {
    try {
      await updateStatus({ 
        id: selectedItem._id, 
        status: statusToUpdate,
        adminNotes: adminNotes
      }).unwrap();
      toast.success('Enquiry updated successfully');
      setViewModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to update enquiry');
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteContact(itemToDelete).unwrap();
      toast.success('Enquiry deleted');
      setDeleteDialogOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#252525] font-bold">Contact Enquiries</h1>
          <div className="flex gap-2 mt-2">
            <Badge variant="primary">New: {stats.new}</Badge>
            <Badge variant="warning">Read: {stats.read}</Badge>
            <Badge variant="success">Responded: {stats.responded}</Badge>
          </div>
        </div>
      </div>

      <Card className="p-4 shadow-sm border-gray-100 flex flex-col md:flex-row gap-4 items-center bg-white">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search name or email..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#D99A32]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select 
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#D99A32]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
          </select>
        </div>
      </Card>

      <Card className="shadow-sm border-gray-100 bg-white overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center"><LoadingSpinner /></div>
        ) : enquiries.length === 0 ? (
          <EmptyState title="No enquiries found" />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-gray-500 text-sm">
                    <th className="p-4 font-medium">Name & Contact</th>
                    <th className="p-4 font-medium">Subject</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map(item => (
                    <tr key={item._id} className={`border-b border-gray-100 hover:bg-gray-50 ${item.status === 'new' ? 'bg-blue-50/30' : ''}`}>
                      <td className="p-4">
                        <p className="font-medium text-[#252525]">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.email}</p>
                        <p className="text-xs text-gray-500">{item.phone}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-700 max-w-xs truncate">{item.subject}</td>
                      <td className="p-4 text-sm text-gray-600">{formatDate(item.createdAt)}</td>
                      <td className="p-4">
                        <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleView(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                            <Eye size={18} />
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

      {/* View Modal */}
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} title="Enquiry Details" size="lg">
        {selectedItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-500">Name</p><p className="font-medium">{selectedItem.name}</p></div>
              <div><p className="text-sm text-gray-500">Date</p><p className="font-medium">{formatDate(selectedItem.createdAt)}</p></div>
              <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selectedItem.email}</p></div>
              <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selectedItem.phone}</p></div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Subject</p>
                <p className="font-medium">{selectedItem.subject}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Message</p>
                <div className="p-3 bg-gray-50 rounded-md mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                  {selectedItem.message}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D99A32]"
                  value={statusToUpdate}
                  onChange={(e) => setStatusToUpdate(e.target.value)}
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="responded">Responded</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Admin Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D99A32]"
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Private notes..."
                ></textarea>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-gray-100">
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>Close</Button>
              <Button onClick={handleUpdate} isLoading={isUpdating}>Save Changes</Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={confirmDelete}
        title="Delete Enquiry" message="Are you sure you want to delete this message?" isLoading={isDeleting}
      />
    </div>
  );
};

export default EnquiriesManagePage;

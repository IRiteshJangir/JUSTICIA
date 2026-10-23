import React, { useState } from "react";
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
  useDeleteAppointmentMutation,
} from "../../services/api";
import { Eye, Trash2, Edit2, Search } from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import Pagination from "../../components/ui/Pagination";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import {
  formatDate,
  formatDateTime,
  getStatusColor,
} from "../../utils/helpers";
import toast from "react-hot-toast";

const AppointmentsManagePage = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedApt, setSelectedApt] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [aptToDelete, setAptToDelete] = useState(null);

  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState("");

  const { data, isLoading, error, refetch } = useGetAppointmentsQuery({
    page,
    limit: 10,
    status: statusFilter,
    search: searchTerm,
  });

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateAppointmentStatusMutation();
  const [deleteAppointment, { isLoading: isDeleting }] =
    useDeleteAppointmentMutation();

  const appointments = data?.data || [];
  const totalPages = data?.pagination?.pages || 1;
  const stats = data?.pagination?.stats || {
    total: data?.pagination?.total || 0,
    pending: 0,
  };

  const handleView = (apt) => {
    setSelectedApt(apt);
    setViewModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setAptToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteAppointment(aptToDelete).unwrap();
      toast.success("Appointment deleted successfully");
      setDeleteDialogOpen(false);
      refetch();
    } catch (err) {
      toast.error("Failed to delete appointment");
    }
  };

  const handleStatusUpdateClick = (apt) => {
    setSelectedApt(apt);
    setStatusToUpdate(apt.status);
    setStatusUpdateOpen(true);
  };

  const confirmStatusUpdate = async () => {
    try {
      await updateStatus({
        id: selectedApt._id,
        status: statusToUpdate,
      }).unwrap();
      toast.success("Status updated successfully");
      setStatusUpdateOpen(false);
      if (viewModalOpen) setViewModalOpen(false);
      refetch();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#252525] font-bold">
            Manage Appointments
          </h1>
          <div className="flex gap-2 mt-2">
            <Badge variant="primary">Total: {stats.total}</Badge>
            <Badge variant="warning">Pending: {stats.pending}</Badge>
          </div>
        </div>
      </div>

      <Card className="p-4 shadow-sm border-gray-100 flex flex-col md:flex-row gap-4 items-center bg-white">
        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
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
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </Card>

      <Card className="shadow-sm border-gray-100 bg-white overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            Unable to load appointments. Please refresh and try again.
          </div>
        ) : appointments.length === 0 ? (
          <EmptyState
            title="No appointments found"
            description="Try adjusting your filters"
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-gray-500 text-sm">
                    <th className="p-4 font-medium">Client</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Date & Time</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr
                      key={apt._id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <p className="font-medium text-[#252525]">
                          {apt.fullName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {apt.practiceArea?.title || "General"}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-700">{apt.email}</p>
                        <p className="text-xs text-gray-500">{apt.phone}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-700">
                          {formatDate(apt.preferredDate)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {apt.preferredTime}
                        </p>
                      </td>
                      <td className="p-4 text-sm text-gray-600 capitalize">
                        {apt.consultationType}
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusColor(apt.status)}>
                          {apt.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleView(apt)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleStatusUpdateClick(apt)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(apt._id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          >
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
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </Card>

      {/* View Modal */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Appointment Details"
      >
        {selectedApt && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Client Name</p>
                <p className="font-medium">{selectedApt.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge variant={getStatusColor(selectedApt.status)}>
                  {selectedApt.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedApt.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{selectedApt.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">
                  {formatDate(selectedApt.preferredDate)} at{" "}
                  {selectedApt.preferredTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Meeting Type</p>
                <p className="font-medium capitalize">
                  {selectedApt.consultationType}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Practice Area</p>
                <p className="font-medium">
                  {selectedApt.practiceArea?.title || "Not specified"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Message / Details</p>
                <div className="p-3 bg-gray-50 rounded-md mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                  {selectedApt.caseDescription ||
                    "No additional details provided."}
                </div>
              </div>
            </div>
            <div className="pt-4 flex justify-end gap-2 border-t border-gray-100 mt-4">
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => handleStatusUpdateClick(selectedApt)}>
                Update Status
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Status Update Modal */}
      <Modal
        isOpen={statusUpdateOpen}
        onClose={() => setStatusUpdateOpen(false)}
        title="Update Status"
      >
        <div className="space-y-4">
          <p>
            Update status for appointment with{" "}
            <strong>{selectedApt?.fullName}</strong>
          </p>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D99A32]"
            value={statusToUpdate}
            onChange={(e) => setStatusToUpdate(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setStatusUpdateOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmStatusUpdate} isLoading={isUpdating}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Appointment"
        message="Are you sure you want to delete this appointment? This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AppointmentsManagePage;

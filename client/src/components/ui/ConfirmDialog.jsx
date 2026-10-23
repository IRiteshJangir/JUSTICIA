import React from 'react';
import Modal from './Modal';
import Button from './Button';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', loading = false }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-6">
        <p className="text-gray-600">{message}</p>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>{confirmText}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;

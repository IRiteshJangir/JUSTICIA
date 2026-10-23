import React, { useRef, useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useUploadImageMutation } from '../../services/api';
import toast from 'react-hot-toast';

const ImageUpload = ({ value, onChange, label }) => {
  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await uploadImage(formData).unwrap();
      onChange(res.url); // assuming response has url
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload image');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-gray-200">
          <img src={value} alt="Preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${dragActive ? 'border-gold bg-gold/5' : 'border-gray-300 hover:border-gold'}`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleUpload(e.target.files[0])}
            className="hidden"
            accept="image/*"
          />
          {isLoading ? (
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-gold mb-2" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          )}
          <p className="text-sm text-gray-600">Click or drag image to upload</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

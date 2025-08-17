import React, { useState } from 'react';
import { Contact, Tag } from '../types';

interface ContactFormProps {
  initialData?: Contact;
  onSubmit: (contact: Contact) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const initialContact: Contact = {
  name: '',
  email: '',
  phone: '',
  tags: 'Other',
  notes: ''
};

export const ContactForm: React.FC<ContactFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading
}) => {
  const [formData, setFormData] = useState<Contact>(initialData || initialContact);
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Contact, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is modified
    if (errors[name as keyof Contact]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof Contact];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-purple-100">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 bg-gray-900 border ${
            errors.name ? 'border-red-500' : 'border-gray-700'
          } rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-purple-100">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 bg-gray-900 border ${
            errors.email ? 'border-red-500' : 'border-gray-700'
          } rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-purple-100">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 bg-gray-900 border ${
            errors.phone ? 'border-red-500' : 'border-gray-700'
          } rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-purple-100">
          Tag
        </label>
        <select
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="Friend">Friend</option>
          <option value="Family">Family</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-purple-100">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 relative overflow-hidden group"
        >
          <span className="relative z-10">
            {isLoading ? 'Saving...' : initialData ? 'Update Contact' : 'Create Contact'}
          </span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 blur-xl group-hover:opacity-70 transition-opacity duration-300 scale-110"></div>
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex justify-center items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
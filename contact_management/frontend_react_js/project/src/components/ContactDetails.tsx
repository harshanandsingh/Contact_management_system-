import React from 'react';
import { Contact } from '../types';

interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
  onEdit: () => void;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({ contact, onClose, onEdit }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTagColor = (tag: string): string => {
    switch (tag) {
      case 'Friend': return 'bg-green-500';
      case 'Family': return 'bg-blue-500';
      case 'Work': return 'bg-yellow-500';
      case 'Other': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-900 bg-opacity-70 backdrop-blur-lg rounded-lg shadow-lg border border-gray-700 overflow-hidden max-w-md w-full">
      <div className="relative">
        {/* Cosmic header background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 opacity-70"></div>
        
        {/* Animated stars effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                animation: `twinkle ${Math.random() * 4 + 3}s infinite`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative py-6 px-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Contact Details</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Name</div>
          <div className="text-lg font-medium text-white">{contact.name}</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Email</div>
          <div className="text-white">{contact.email}</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Phone</div>
          <div className="text-white">{contact.phone}</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Tag</div>
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagColor(contact.tags)} bg-opacity-20 text-white`}>
              {contact.tags}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Created On</div>
          <div className="text-white">{formatDate(contact.createdOn)}</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm text-gray-400">Notes</div>
          <div className="text-white bg-gray-800 p-3 rounded-md">
            {contact.notes || 'No notes available.'}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-800 flex justify-end">
        <button
          onClick={onEdit}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 relative overflow-hidden group"
        >
          <span className="relative z-10">Edit Contact</span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
};
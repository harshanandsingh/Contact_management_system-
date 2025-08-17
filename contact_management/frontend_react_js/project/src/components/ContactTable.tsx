import React from 'react';
import { Contact, SortOptions, Tag } from '../types';

interface ContactTableProps {
  contacts: Contact[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (contact: Contact) => void;
  onView: (id: number) => void;
  sorting: SortOptions;
  onSort: (options: SortOptions) => Promise<void>;
  isLoading: boolean;
}

export const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  onDelete,
  onEdit,
  onView,
  sorting,
  onSort,
  isLoading
}) => {
  const handleSort = (sortBy: 'id' | 'name') => {
    const direction = sorting.sortBy === sortBy && sorting.direction === 'asc' ? 'desc' : 'asc';
    onSort({ sortBy, direction });
  };

  const getTagColor = (tag: Tag): string => {
    switch (tag) {
      case 'Friend': return 'bg-green-500';
      case 'Family': return 'bg-blue-500';
      case 'Work': return 'bg-yellow-500';
      case 'Other': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800">
        <div className="py-20 text-center">
          <div className="flex justify-center">
            <svg className="animate-spin h-10 w-10 text-purple-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="mt-4 text-purple-200">Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="w-full overflow-x-auto bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 py-16 text-center">
        <p className="text-xl text-purple-200">No contacts found.</p>
        <p className="text-sm text-gray-400 mt-2">Try adding a new contact or adjusting your search parameters.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-800 bg-opacity-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('id')}
            >
              <div className="flex items-center">
                ID
                {sorting.sortBy === 'id' && (
                  <span className="ml-1">
                    {sorting.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                Name
                {sorting.sortBy === 'name' && (
                  <span className="ml-1">
                    {sorting.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
              Phone
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
              Created On
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
              Tag
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
              Notes
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-purple-200 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {contacts.map((contact) => (
            <tr key={contact.id} className="hover:bg-gray-800 hover:bg-opacity-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-200">{contact.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{contact.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-200">{contact.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-200">{contact.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-200">{formatDate(contact.createdOn)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagColor(contact.tags)} bg-opacity-20 text-white`}>
                  {contact.tags}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-purple-200 max-w-xs truncate">{contact.notes}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onView(contact.id!)}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(contact)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => contact.id && onDelete(contact.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
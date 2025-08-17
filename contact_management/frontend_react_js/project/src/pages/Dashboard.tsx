import React, { useState } from 'react';
import { Contact } from '../types';
import { ContactTable } from '../components/ContactTable';
import { ContactForm } from '../components/ContactForm';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import { ContactDetails } from '../components/ContactDetails';
import { ExportButton } from '../components/ExportButton';
import { RecentContactsSelector } from '../components/RecentContactsSelector';
import { ContactsSummary } from '../components/ContactsSummary';
import { Modal } from '../components/Modal';
import { useContacts } from '../context/ContactsContext';

const Dashboard: React.FC = () => {
  const {
    contacts,
    selectedContact,
    totalContacts,
    loading,
    error,
    pagination,
    totalPages,
    sorting,
    fetchContacts,
    fetchContactById,
    createContact,
    updateContact,
    deleteContact,
    searchContacts,
    sortContacts,
    setPagination,
    getRecentContacts,
    exportContacts,
    clearSelectedContact
  } = useContacts();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page });
  };

  const handlePageSizeChange = (size: number) => {
    setPagination({ page: 0, size });
  };

  const handleView = async (id: number) => {
    await fetchContactById(id);
    setIsViewModalOpen(true);
  };

  const handleEdit = (contact: Contact) => {
    setContactToEdit(contact);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      await deleteContact(id);
    }
  };

  const handleAddContact = () => {
    setIsAddModalOpen(true);
  };

  const handleEditFromView = () => {
    if (selectedContact) {
      setContactToEdit(selectedContact);
      setIsViewModalOpen(false);
      setIsEditModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 bg-opacity-80 backdrop-blur-md border-b border-gray-800 shadow-lg py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 mb-4 md:mb-0">
              Stellar Contacts
            </h1>
            <div className="flex space-x-4">
              <ExportButton onExport={exportContacts} isLoading={loading} />
              <button
                onClick={handleAddContact}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-1">
        {error && (
          <div className="mb-6 p-4 bg-red-900 bg-opacity-50 border border-red-700 rounded-md text-white">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            <SearchBar
              onSearch={searchContacts}
              onReset={fetchContacts}
              isLoading={loading}
            />
          </div>
          <div>
            <RecentContactsSelector
              onSelectRecent={getRecentContacts}
              isLoading={loading}
            />
          </div>
        </div>

        <div className="mb-6">
          <ContactsSummary
            totalContacts={totalContacts}
            isLoading={loading}
          />
        </div>

        <div className="mb-6">
          <ContactTable
            contacts={contacts}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onView={handleView}
            sorting={sorting}
            onSort={sortContacts}
            isLoading={loading}
          />
        </div>

        <div>
          <Pagination
            currentPage={pagination.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageSize={pagination.size}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </main>

      {/* Add Contact Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <div className="bg-gray-900 bg-opacity-90 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-gray-700 max-w-lg w-full">
          <h2 className="text-xl font-bold text-white mb-4">Add New Contact</h2>
          <ContactForm
            onSubmit={async (contact) => {
              await createContact(contact);
              setIsAddModalOpen(false);
            }}
            onCancel={() => setIsAddModalOpen(false)}
            isLoading={loading}
          />
        </div>
      </Modal>

      {/* Edit Contact Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="bg-gray-900 bg-opacity-90 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-gray-700 max-w-lg w-full">
          <h2 className="text-xl font-bold text-white mb-4">Edit Contact</h2>
          <ContactForm
            initialData={contactToEdit || undefined}
            onSubmit={async (contact) => {
              if (contactToEdit?.id) {
                await updateContact(contactToEdit.id, contact);
                setIsEditModalOpen(false);
              }
            }}
            onCancel={() => setIsEditModalOpen(false)}
            isLoading={loading}
          />
        </div>
      </Modal>

      {/* View Contact Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => {
        setIsViewModalOpen(false);
        clearSelectedContact();
      }}>
        {selectedContact && (
          <ContactDetails
            contact={selectedContact}
            onClose={() => {
              setIsViewModalOpen(false);
              clearSelectedContact();
            }}
            onEdit={handleEditFromView}
          />
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
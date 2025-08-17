import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Contact, ContactsResponse, PaginationOptions, SearchOptions, SortOptions, Tag } from '../types';
import * as contactService from '../services/contactService';

interface ContactsContextType {
  // Data
  contacts: Contact[];
  selectedContact: Contact | null;
  totalContacts: number;
  loading: boolean;
  error: string | null;
  
  // Pagination
  pagination: PaginationOptions;
  totalPages: number;
  
  // Sorting
  sorting: SortOptions;
  
  // Actions
  fetchContacts: () => Promise<void>;
  fetchContactById: (id: number) => Promise<void>;
  createContact: (contact: Contact) => Promise<void>;
  updateContact: (id: number, contact: Contact) => Promise<void>;
  deleteContact: (id: number) => Promise<void>;
  searchContacts: (options: SearchOptions) => Promise<void>;
  searchByName: (name: string) => Promise<void>;
  searchByPhone: (phone: string) => Promise<void>;
  searchByTag: (tag: Tag) => Promise<void>;
  sortContacts: (options: SortOptions) => Promise<void>;
  setPagination: (options: PaginationOptions) => void;
  getRecentContacts: (days: number) => Promise<void>;
  exportContacts: (days: number) => Promise<void>;
  clearSelectedContact: () => void;
}

const defaultPagination: PaginationOptions = { page: 0, size: 5 };
const defaultSorting: SortOptions = { sortBy: 'id', direction: 'asc' };

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export const ContactsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [totalContacts, setTotalContacts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationOptions>(defaultPagination);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sorting, setSorting] = useState<SortOptions>(defaultSorting);

  // Fetch contacts with current pagination and sorting
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await contactService.getPaginatedContacts(pagination);
      setContacts(response.contacts);
      setTotalPages(response.totalPages || 1);
      
      // Also update total count
      const count = await contactService.getTotalContactsCount();
      setTotalContacts(count);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchContactById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const contact = await contactService.getContactById(id);
      setSelectedContact(contact);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contact: Contact) => {
    setLoading(true);
    setError(null);
    try {
      await contactService.createContact(contact);
      fetchContacts(); // Refresh the list
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (id: number, contact: Contact) => {
    setLoading(true);
    setError(null);
    try {
      await contactService.updateContact(id, contact);
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({ ...contact, id });
      }
      fetchContacts(); // Refresh the list
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await contactService.deleteContact(id);
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(null);
      }
      fetchContacts(); // Refresh the list
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const searchContacts = async (options: SearchOptions) => {
    setLoading(true);
    setError(null);
    try {
      const results = await contactService.advancedSearch(options);
      setContacts(results);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const searchByName = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = await contactService.searchByName(name);
      setContacts(results);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const searchByPhone = async (phone: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = await contactService.searchByPhone(phone);
      setContacts(results);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const searchByTag = async (tag: Tag) => {
    setLoading(true);
    setError(null);
    try {
      const results = await contactService.searchByTag(tag);
      setContacts(results);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const sortContacts = async (options: SortOptions) => {
    setSorting(options);
    setLoading(true);
    setError(null);
    try {
      const results = await contactService.sortContacts(options);
      setContacts(results);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const getRecentContacts = async (days: number) => {
    setLoading(true);
    setError(null);
    try {
      const results = await contactService.getRecentContacts(days);
      setContacts(results);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const exportContacts = async (days: number) => {
    setLoading(true);
    setError(null);
    try {
      const blob = await contactService.exportContactsToCSV(days);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts_last_${days}_days.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const clearSelectedContact = () => {
    setSelectedContact(null);
  };

  // Initial fetch
  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const value = {
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
    searchByName,
    searchByPhone,
    searchByTag,
    sortContacts,
    setPagination,
    getRecentContacts,
    exportContacts,
    clearSelectedContact,
  };

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
};

export const useContacts = (): ContactsContextType => {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};
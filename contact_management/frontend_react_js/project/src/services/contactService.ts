import { Contact, ContactsResponse, PaginationOptions, SearchOptions, SortOptions, Tag } from '../types';

const API_URL = 'http://localhost:8080';

// Get all contacts
export const getContacts = async (): Promise<Contact[]> => {
  const response = await fetch(`${API_URL}/contacts`);
  if (!response.ok) throw new Error('Failed to fetch contacts');
  return response.json();
};

// Get contact by ID
export const getContactById = async (id: number): Promise<Contact> => {
  const response = await fetch(`${API_URL}/contacts/${id}`);
  if (!response.ok) throw new Error('Failed to fetch contact');
  return response.json();
};

// Create a new contact
export const createContact = async (contact: Contact): Promise<Contact> => {
  const response = await fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) throw new Error('Failed to create contact');
  return response.json();
};

// Update a contact
export const updateContact = async (id: number, contact: Contact): Promise<Contact> => {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });
  if (!response.ok) throw new Error('Failed to update contact');
  return response.json();
};

// Delete a contact
export const deleteContact = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete contact');
};

// Search contacts by name
export const searchByName = async (name: string): Promise<Contact[]> => {
  const response = await fetch(`${API_URL}/contacts/search?name=${encodeURIComponent(name)}`);
  if (!response.ok) throw new Error('Failed to search contacts');
  return response.json();
};

// Search contacts by phone
export const searchByPhone = async (phone: string): Promise<Contact[]> => {
  const response = await fetch(`${API_URL}/contacts/search/phone?phone=${encodeURIComponent(phone)}`);
  if (!response.ok) throw new Error('Failed to search contacts');
  return response.json();
};

// Search contacts by tag
export const searchByTag = async (tag: Tag): Promise<Contact[]> => {
  const response = await fetch(`${API_URL}/contacts/search/tag?tag=${encodeURIComponent(tag)}`);
  if (!response.ok) throw new Error('Failed to search contacts');
  return response.json();
};

// Advanced search
export const advancedSearch = async (options: SearchOptions): Promise<Contact[]> => {
  const params = new URLSearchParams();
  if (options.name) params.append('name', options.name);
  if (options.tag) params.append('tag', options.tag);
  if (options.notes) params.append('notes', options.notes);
  
  const response = await fetch(`${API_URL}/contacts/search/advanced?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to search contacts');
  return response.json();
};

// Sort contacts
export const sortContacts = async (options: SortOptions): Promise<Contact[]> => {
  const response = await fetch(
    `${API_URL}/contacts/sort?sortBy=${options.sortBy}&direction=${options.direction}`
  );
  if (!response.ok) throw new Error('Failed to sort contacts');
  return response.json();
};

// Get paginated contacts
export const getPaginatedContacts = async (
  options: PaginationOptions
): Promise<ContactsResponse> => {
  const response = await fetch(
    `${API_URL}/contacts/page?page=${options.page}&size=${options.size}`
  );
  if (!response.ok) throw new Error('Failed to fetch contacts');
  return response.json();
};

// Get total contact count
export const getTotalContactsCount = async (): Promise<number> => {
  const response = await fetch(`${API_URL}/contacts/stats/total`);
  if (!response.ok) throw new Error('Failed to fetch total count');
  const data = await response.json();
  return data.total;
};

// Get recent contacts
export const getRecentContacts = async (days: number): Promise<Contact[]> => {
  const response = await fetch(`${API_URL}/contacts/recent?days=${days}`);
  if (!response.ok) throw new Error('Failed to fetch recent contacts');
  return response.json();
};

// Export contacts to CSV
export const exportContactsToCSV = async (days: number): Promise<Blob> => {
  const response = await fetch(`${API_URL}/contacts/export?days=${days}`);
  if (!response.ok) throw new Error('Failed to export contacts');
  return response.blob();
};
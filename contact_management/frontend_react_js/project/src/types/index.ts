export interface Contact {
  id?: number;
  name: string;
  email: string;
  phone: string;
  tags: Tag;
  notes: string;
  createdOn?: string;
}

export type Tag = 'Friend' | 'Family' | 'Work' | 'Other';

export interface ContactsResponse {
  contacts: Contact[];
  totalPages?: number;
  currentPage?: number;
}

export interface SortOptions {
  sortBy: 'id' | 'name';
  direction: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  size: number;
}

export interface SearchOptions {
  name?: string;
  phone?: string;
  tag?: Tag;
  notes?: string;
}
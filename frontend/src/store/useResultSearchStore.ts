import { create } from 'zustand';
import type { Book } from '../models/book.model';

type ResultSearchStore = {
  searchResults: Book[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  searchQuery: string;
  setSearchResults: (results: Book[]) => void;
  appendSearchResults: (results: Book[]) => void;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  clearResults: () => void;
};

export const useResultSearchStore = create<ResultSearchStore>((set) => ({
  searchResults: [],
  page: 1,
  hasMore: true,
  isLoading: false,
  searchQuery: '',
  setSearchResults: (results) => set({ searchResults: results }),
  appendSearchResults: (results) =>
    set((state) => ({ searchResults: [...state.searchResults, ...results] })),
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
  setLoading: (isLoading) => set({ isLoading }),
  setSearchQuery: (query) => set({ searchQuery: query, page: 1, hasMore: true }),
  clearResults: () => set({ searchResults: [], searchQuery: '', page: 1, hasMore: true }),
}));
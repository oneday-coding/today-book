// src/store/RecentSearchStore.ts
import { create } from 'zustand';

type RecentSearchStore = {
  recentSearches: string[];
  setRecentSearches: (list: string[]) => void;
  addSearchKeyword: (keyword: string) => void;
  loadFromStorage: () => void;
  clearAllStorage: () => void;
  removeOneStorage: (value: string) => void;
};

export const useRecentSearchStore = create<RecentSearchStore>((set, get) => ({
  recentSearches: [],
  setRecentSearches: (list) => {
    localStorage.setItem('searchBookRecords', JSON.stringify(list));
    set({ recentSearches: list });
  },
  addSearchKeyword: (keyword) => {
    if(keyword.trim() === '') return;
    set((state) => {
      const filtered = state.recentSearches.filter((item) => item !== keyword);
      const newList = [keyword, ...filtered].slice(0, 10);
      localStorage.setItem('searchBookRecords', JSON.stringify(newList));
      return { recentSearches: newList };
    })
  },
  loadFromStorage: () => {
    const stored = JSON.parse(localStorage.getItem('searchBookRecords') || '[]');
    set({ recentSearches: stored });
  },
  clearAllStorage: () => {
    get().setRecentSearches([]);
  },
  removeOneStorage: (value) => {
    const prev = get().recentSearches;
    const removed = prev.filter((item) => item !== value);
    get().setRecentSearches(removed);
  },
}));

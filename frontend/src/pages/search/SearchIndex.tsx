import { useEffect } from 'react';
import { useRecentSearchStore } from '../../store/recentSearchStore';
import HeaderIndex from './header/HeaderIndex';
import MainIndex from './main/MainIndex';

export default function SearchIndex() {
  const loadFromStorage = useRecentSearchStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <>
      <HeaderIndex />
      <MainIndex />
    </>
  );
}

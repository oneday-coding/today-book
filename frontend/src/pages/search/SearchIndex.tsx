import { useEffect } from 'react';
import { useRecentSearchStore } from '../../store/useRecentSearchStore';
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

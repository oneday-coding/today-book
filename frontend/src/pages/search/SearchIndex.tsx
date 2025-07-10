import { useEffect } from 'react';
import { useRecentSearchStore } from '../../store/useRecentSearchStore';
import MainIndex from './main/MainIndex';
import BackButton from '../../components/buttons/BackButton';
import Header from '../../layout/Header';
import SearchWindow from './headerChildren/SearchWindow';

export default function SearchIndex() {
  const loadFromStorage = useRecentSearchStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <>
      <Header>
        <BackButton />
        <SearchWindow />
      </Header>
      <MainIndex />
    </>
  );
}

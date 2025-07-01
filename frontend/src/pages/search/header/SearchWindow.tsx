import { useState } from 'react';
import { useRecentSearchStore } from '../../../store/recentSearchStore';
import useBookSearch from '../../../hooks/useBookSearch';

export default function SearchWindow() {
  const addSearchKeyword = useRecentSearchStore((state) => state.addSearchKeyword);
  const [searchValue, setSearchValue] = useState<string>('');
  const { searchBooks } = useBookSearch();

  async function handleSearch() {
    await searchBooks(searchValue);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addSearchKeyword(searchValue);
        handleSearch();
      }}
      className="flex items-center h-10 w-[calc(100%-2rem)] pl-6 pr-3 rounded-full bg-searchBg"
    >
      <input
        type="text"
        className="min-w-0 flex-1 h-full "
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
        placeholder="도서 제목 또는 저자 검색"
      />

      {searchValue && (
        <button
          className="shrink-0 w-5 h-5 bg-100"
          style={{ backgroundImage: "url('/icons/button/clearSearch.svg')" }}
          type="button"
          onClick={() => {
            setSearchValue('');
          }}
        ></button>
      )}

      <button
        className="shrink-0 inline-block w-5 h-5 bg-100"
        style={{ backgroundImage: "url('/icons/button/icon_search.svg')" }}
        type="submit"
      ></button>
    </form>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useRecentSearchStore } from '../../../store/useRecentSearchStore';
import useBookSearch from '../../../hooks/useBookSearch_old';

export default function SearchWindow() {
  const addSearchKeyword = useRecentSearchStore((state) => state.addSearchKeyword);
  const [searchValue, setSearchValue] = useState<string>('');
  const { searchBooks } = useBookSearch();

  function keyDownEsc(keycode: string) {
    if (keycode === 'Escape') {
      setSearchValue('');
    }
  }

  // (검색 자동완성) 백엔드 없이 프론트엔드로만 구현 불가능
  // => 이유 : 알라딘 API 의 CORS 정책 때문 (같은 출처에서만 요청과 응답이 허용됨, 단 서버<->서버 간 통신은 CORS와 무관)
  // async function resultOfautocomplete(searchValue: string) {
  //   const apiUrl = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=발급키&Query=${encodeURIComponent(searchValue)}&QueryType=Title&MaxResults=5&start=1&SearchTarget=Book&output=JS&Version=20131101`;
  //   const response = await axios.get(apiUrl);
  //   console.log(response.data);
  //   return response.data;
  // }
  // useEffect(() => {
  //   resultOfautocomplete(searchValue);
  // }, [searchValue]);

  // 검색창 자동 focus
  const inputRef = useRef<HTMLInputElement>(null); // 1. input에 사용할 ref 선언
  useEffect(() => {
    inputRef.current?.focus(); // 2. 마운트 시 자동 focus
  }, []);

  return (
    <form
    className="flex items-center h-10 w-[calc(100%-2rem)] pl-6 pr-3 rounded-full bg-searchBg"
      onSubmit={(e) => {
        e.preventDefault();
        addSearchKeyword(searchValue);
        searchBooks(searchValue);
        setSearchValue('');
      }}
    >
      <input
        className="min-w-0 flex-1 h-full"
        ref={inputRef}
        type="text"
        value={searchValue}
        placeholder="도서 제목 또는 저자 검색"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => keyDownEsc(e.key)}
      />

      {searchValue.length > 0 && (
        <button
          className="shrink-0 w-5 h-5 bg-100 mr-[8px]"
          style={{ backgroundImage: "url('/icons/button/clearSearch.svg')" }}
          type="button"
          onClick={() => setSearchValue('')}
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

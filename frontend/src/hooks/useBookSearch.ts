import { useCallback } from 'react';
import { getBookSearch } from '../api/books';
import { useResultSearchStore } from '../store/resultSearchStore';

export default function useBookSearch() {
  const { setSearchResults, setLoading, setSearchQuery } = useResultSearchStore();

  const searchBooks = useCallback(async (searchValue: string) => {
    if (!searchValue.trim()) return;
    
    // 검색 초기화
    setLoading(true);
    setSearchQuery(searchValue);
    setSearchResults([]);
    
    // 검색 재 실행
    try {
      const result = await getBookSearch(searchValue, 1, 10);
      console.log('searchBooks API result : ', result);
      setSearchResults(result);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [setSearchResults, setLoading, setSearchQuery]); 
  // useCallback : 의존성 배열이 변경되지 않으면 함수를 재생성하지 않음 (성능 개선)
  // 작은 계산의 함수에선 성능차이 없음

  return { searchBooks };
}

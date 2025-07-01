import { useResultSearchStore } from '../../../store/resultSearchStore';
import Loading from '../../../components/Loading';
import InfiniteBookList from './InfiniteBooklist';
// import { useEffect } from 'react';

export default function SearchResults() {
  const { searchResults, isLoading, searchQuery } = useResultSearchStore();

  // // 검색어가 바뀌면 초기화
  // useEffect(() => {
    // clearResults();
  // }, [searchQuery]);

  // 검색어가 없을 때 (초기 상태)
  if (!searchQuery) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>검색어를 입력하고 검색해보세요</p>
      </div>
    );
  }
  
  // 로딩 중일 때 (초기 로딩)
  if (isLoading && searchResults.length === 0) return <Loading />;

  // 검색 결과가 없을 때 (로딩 끝나고도 결과가 없음음)
  if (!isLoading && searchResults.length === 0) {
    const noResultMessage = `${searchQuery}에 대한 검색 결과가 없습니다.`;
    return (
      <div className="text-center py-8">
        <h2 className="section-title mb-4">검색 결과</h2>
        <p className="text-gray-500">{noResultMessage}</p>
      </div>
    );
  }

  // 검색 결과가 있을 때
  const resultTitle = `${searchQuery} 검색 결과 (${searchResults.length}건)`;
  return (
    <div>
      <h2 className="section-title mb-4">{resultTitle}</h2>
      <InfiniteBookList />
    </div>
  );
}

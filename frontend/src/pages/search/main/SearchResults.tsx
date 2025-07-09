import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import NoMoreBooks from '../../../components/NoMoreBooks';
import useBookSearch from '../../../hooks/useBookSearch';
import type { Book } from '../../../models/book.model';
import InfiniteBookList from './InfiniteBooklist';
import { useResultSearchStore } from '../../../store/useResultSearchStore';
import { useEffect } from 'react';

export default function SearchResults() {
  const searchQuery = useResultSearchStore((state) => state.searchQuery);
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useBookSearch(searchQuery, 10);

  const allBooks = (data as InfiniteData<Book[]>)?.pages?.flat() ?? [];

  // 키워드가 바뀔 때 이전 검색 결과(캐시) 제거
  // 제거하지 않을 시 => 이전 검색 결과(결과 목록, 페이지)가 남아있어, 이미 검색했던 키워드를 다시 검색했을 때 => 페이지가 쌓인 결과가 보임
  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      // cleanup function => 컴포넌트가 언마운트 될 때 또는 의존성배열 변경 직전에 실행
      queryClient.removeQueries({
        queryKey: ['search', searchQuery],
        exact: true,
      });
    };
  }, [searchQuery]);

  if (!searchQuery) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>검색어를 입력하고 검색해보세요</p>
      </div>
    );
  }

  if (isLoading) return <Loading />;
  if (isError) return <div>에러가 발생하였습니다.</div>;

  if (!isLoading && allBooks.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="section-title mb-4">검색 결과</h2>
        <p className="text-gray-500">{searchQuery}에 대한 검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="section-title mb-4">
        {searchQuery} 검색 결과 ({allBooks.length}건)
      </h2>
      <InfiniteBookList
        books={allBooks}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      {!hasNextPage && <NoMoreBooks />}
      {isFetchingNextPage && <Loading />}
    </div>
  );
}

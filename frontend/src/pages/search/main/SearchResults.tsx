import type { InfiniteData } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import NoMoreBooks from '../../../components/NoMoreBooks';
import useBookSearch from '../../../hooks/useBookSearch';
import type { Book } from '../../../models/book.model';
import InfiniteBookList from './InfiniteBooklist';
import { useResultSearchStore } from '../../../store/useResultSearchStore';

export default function SearchResults() {
  const searchQuery = useResultSearchStore((state) => state.searchQuery);
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useBookSearch(searchQuery, 10);

  const allBooks = (data as InfiniteData<Book[]>)?.pages?.flat() ?? [];

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

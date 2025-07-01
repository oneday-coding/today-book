import type { Book } from '../../../models/book.model';
import InfiniteBookList from './InfiniteBookList';
import Loading from '../../../components/Loading';
import NoMoreBooks from '../../../components/NoMoreBooks';
import useBookList from '../../../hooks/useBookList';
import type { InfiniteData } from '@tanstack/react-query';

interface BookListProps {
  bookType: string | undefined;
}

export default function BookList({ bookType }: BookListProps) {
  // type이 존재하지 않을 때
  if (!bookType) return <div>해당 주제의 책 리스트가 존재하지 않습니다.</div>;

  const limit = 10;

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useBookList(
    bookType,
    limit
  );
  const allBooks = (data as InfiniteData<Book[]>)?.pages?.flat() ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <div>에러가 발생하였습니다.</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div>
      <InfiniteBookList
        books={allBooks}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      {isFetchingNextPage && <Loading />}
      {hasNextPage || <NoMoreBooks />}
    </div>
  );
}

import { useState } from "react";
import type { Book } from "../../../models/book.model";
import InfiniteBookList from "./InfiniteBookList";
import Loading from "../../../components/Loading";

interface BookListProps {
  bookType: string;
}

export default function BookList({ bookType }: BookListProps) {
  // type이 존재하지 않을 때
  if(!bookType) return <div>해당 주제의 책 리스트가 존재하지 않습니다.</div>;
  
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const limit = 10;

  function appendSearchResults(newResults: Book[]) {
    setSearchResults(prev => [...prev, ...newResults]);
  }

  if(!isLoading && searchResults.length === 0) return <div>책 목록이 존재하지 않습니다.</div>;

  return (
    <div>
      <InfiniteBookList 
        bookType={bookType} 
        searchResults={searchResults} 
        setSearchResults={setSearchResults}
        appendSearchResults={appendSearchResults} 
        page={page} 
        limit={limit} 
        hasMore={hasMore}
        isLoading={isLoading} 
        setPage={setPage} 
        setHasMore={setHasMore} 
        setLoading={setLoading}
       />
       {isLoading && <Loading />}
    </div>
  );
}
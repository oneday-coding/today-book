import { useEffect, useRef, useCallback } from 'react';
import { getBookList } from '../../../api/books';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../../models/book.model';

interface InfiniteBookListProps {
  bookType: string;
  searchResults: Book[];
  setSearchResults: (searchResult: Book[]) => void;
  appendSearchResults: (newResults: Book[]) => void;
  page: number;
  limit: number;
  hasMore: boolean;
  isLoading: boolean;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setLoading: (isLoading: boolean) => void;
}

export default function InfiniteBookList({ bookType, searchResults, setSearchResults, appendSearchResults, page, limit, hasMore, isLoading, setPage, setHasMore, setLoading }: InfiniteBookListProps) {
  const navigate = useNavigate();

  // 데이터 불러오기
  useEffect(() => {
    setLoading(true);
    console.log(page);
    getBookList(bookType, page, limit)
      .then(result => {
        if (page === 1) setSearchResults(result);
        else appendSearchResults(result);
        setHasMore(result.length === limit);
      })
      .finally(() => setLoading(false));
  }, [page]);
  
  const observer = useRef<IntersectionObserver | null>(null);

  // 무한 스크롤 감지
  const lastElementRef = useCallback((node: Element | null) => { // node는 React가 자동으로 전달해주는 DOM 요소
    if (isLoading) return;
    if (observer.current) observer.current.disconnect(); // 이전 관찰자 제거
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(page + 1); // 마지막 요소가 보이면 다음 페이지 요청
      }
    });
    if (node) observer.current.observe(node); // 현재 요소 관찰 시작
  }, [isLoading, hasMore, page, setPage]);

  // 책 상세 페이지로 이동
  function goDetail(isbn13: number) {
    navigate(`/detail/${isbn13}`);
  }

  return (
    <ul className="grid grid-cols-2 gap-4">
      {searchResults.map((book, idx) => (
        <li 
        key={book.isbn13}
        // ref는 React에서 DOM 요소나 컴포넌트 인스턴스에 직접 접근할 수 있게 해주는 특별한 속성.
         ref={idx === searchResults.length - 1 ? lastElementRef : null}
          onClick={() => goDetail(book.isbn13)}
         >
          <div className="book-container">
              <img className="book-cover w-full" src={book.cover} alt={book.title} />
            </div>
            <div className="mt-2">
              <p className="book-title">{book.title}</p>
              <p className="book-author">{book.author}</p>
            </div>
        </li>
      ))}
    </ul>
  );
}
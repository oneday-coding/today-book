import { useEffect, useRef, useCallback } from 'react';
import { useResultSearchStore } from '../../../store/resultSearchStore';
import { getBookSearch } from '../../../api/books';
import { useNavigate } from 'react-router-dom';

export default function InfiniteBookList() {
  const navigate = useNavigate();
  const {
    searchResults, page, hasMore, isLoading, searchQuery,
    setSearchResults, appendSearchResults, setPage, setHasMore, setLoading
  } = useResultSearchStore();

  const observer = useRef<IntersectionObserver | null>(null);

  // 데이터 불러오기
  useEffect(() => {
    if (!searchQuery) return;
    setLoading(true);
    getBookSearch(searchQuery, page, 10)
      .then(result => {
        if (page === 1) setSearchResults(result);
        else appendSearchResults(result);
        setHasMore(result.length === 10);
      })
      .finally(() => setLoading(false));
  }, [page, searchQuery]);

  // 무한 스크롤 감지
  const lastElementRef = useCallback((node: Element | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(page + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore, page, setPage]);

  // 책 상세 페이지로 이동
  function goDetail(isbn13: number) {
    navigate(`/detail/${isbn13}`);
  }

  return (
    <ul className="space-y-4 w-full">
      {searchResults.map((book, idx) => (
        <li 
        key={book.isbn13}
         ref={idx === searchResults.length - 1 ? lastElementRef : null}
         className="aspect-[3.298/1]"
          onClick={() => goDetail(book.isbn13)}
         >
          {/* 책 정보 렌더링 */}
          <div className='card-horizontal border'>
              <div className='book-container'>
                <img 
                  className="book-cover" 
                  src={book.cover} 
                  alt={book.title} 
                  />
              </div>
              <div className="book-text">
                <p className="book-title font-semibold text-lg mb-1">{book.title}</p>
                <p className="book-author text-gray-600 mb-2">{book.author}</p>
                <p className="book-publisher text-xs text-gray-500 mb-2">{book.publisher}</p>
                <p className="book-description mt-3 text-sm text-gray-700 line-clamp-2">
                  {book.description}
                </p>
              </div>
            </div>
        </li>
      ))}
    </ul>
  );
}
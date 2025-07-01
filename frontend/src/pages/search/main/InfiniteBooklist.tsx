import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../../models/book.model';

interface Props {
  books: Book[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

export default function InfiniteBookList({
  books,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) {
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  function goDetail(isbn13: number) {
    navigate(`/detail/${isbn13}`);
  }

  return (
    <ul className="space-y-4 w-full">
      {books.map((book, idx) => (
        <li
          key={book.isbn13}
          ref={idx === books.length - 1 ? lastElementRef : null}
          className="aspect-[3.298/1]"
          onClick={() => goDetail(book.isbn13)}
        >
          <div className="card-horizontal border">
            <div className="book-container">
              <img className="book-cover" src={book.cover} alt={book.title} />
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

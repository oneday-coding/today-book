import { useEffect, useState } from 'react';
import { getBookList } from '../api/books';
import type {Book} from '../models/book.model';

export default function useBookList(type: string, page: number, limit: number) {
  const [bookData, setBookData] = useState<Book[] | null>(null);;
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getBookList(type, page, limit)
      .then((result) => {
        setBookData(result)

      })
      .catch((error) => setError(error));
  }, []);

  return { bookData, error };
}

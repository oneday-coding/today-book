import { useNavigate } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import useBookList from '../../../../hooks/useBookList';
import type { InfiniteData } from '@tanstack/react-query';
import type { Book } from '../../../../models/book.model';

interface SectionListProps {
  LIMIT: number;
}

export default function SectionList({ LIMIT }: SectionListProps) {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useBookList('best', LIMIT);
  const allBooks = (data as InfiniteData<Book[]>)?.pages?.flat() ?? [];

  if (isError) return <p>에러!</p>;
  if (isLoading) return <Loading />;
  if (!allBooks) return <div>책 데이터가 없습니다.</div>;

  return (
    <div>
      {allBooks.slice(0, LIMIT).map((value, index) => {
        return (
          <div
            onClick={() => {
              navigate(`/detail/${value.isbn13}`);
            }}
            key={index}
            className={`${index !== 0 ? 'mt-md' : ''} aspect-[3.298/1]`}
          >
            <div className="card-horizontal">
              <div
                className={`${index === 0 ? 'bg-mainBlue' : 'bg-textGray'} text-white w-8 h-8 flex justify-center items-center rounded-lg`}
              >
                {index + 1}
              </div>
              <div className="book-text">
                <p className="book-title">{value.title}</p>
                <p className="book-author">
                  {value.author} | {value.publisher}
                </p>
              </div>
              <div className="book-container">
                <img className="book-cover" src={value.cover} alt={value.title} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

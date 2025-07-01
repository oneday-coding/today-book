import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import useBookList from '../../../../hooks/useBookList';
import type { InfiniteData } from '@tanstack/react-query';
import type { Book } from '../../../../models/book.model';

interface SectionSwiperProps {
  LIMIT: number;
  swiperLeng: number | undefined;
}

export default function SectionSwiper({ LIMIT, swiperLeng }: SectionSwiperProps) {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useBookList('new', LIMIT);
  const allBooks = (data as InfiniteData<Book[]>)?.pages?.flat() ?? [];

  if (isError) return <p>에러!</p>;
  if (isLoading) return <Loading />;
  if (!allBooks) return <div>책 데이터가 없습니다.</div>;

  return (
    <Swiper spaceBetween={12} slidesPerView={swiperLeng}>
      {allBooks.slice(0, LIMIT).map((value, index) => {
        return (
          <SwiperSlide
            onClick={() => {
              navigate(`/detail/${value.isbn13}`);
            }}
            key={index}
          >
            <div className="book-container">
              <img src={value.cover} alt={value.title} className="book-cover w-full" />
            </div>
            <div className="mt-2">
              <p className="book-title">{value.title}</p>
              <p className="book-author">{value.author}</p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

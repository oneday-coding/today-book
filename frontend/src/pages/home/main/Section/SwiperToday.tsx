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

  const { data, isLoading, isError } = useBookList('today', LIMIT);
  const allBooks = (data as InfiniteData<Book[]>)?.pages?.flat() ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <p>에러!</p>;
  if (!allBooks) return <p>데이터가 없습니다.</p>;

  return (
    <Swiper spaceBetween={12} slidesPerView={swiperLeng}>
      {allBooks.slice(0, LIMIT).map((value, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              onClick={() => {
                navigate(`/detail/${value.isbn13}`);
              }}
              className="aspect-[1.5208/1] rounded-[24px] overflow-hidden relative"
            >
              <img src={value.cover} alt={value.title} className="block w-full h-full" />
              <div className="p-[16px] absolute w-full bottom-[0px] left-[0px] bg-gradient-to-t from-black/70 to-black/0">
                <p className="book-title text-white">{value.title}</p>
                <p className="book-author text-white">
                  {value.author} 저 | {value.publisher}
                </p>
              </div>
            </div>
            <p className="mt-3 book-description line-clamp-3">{value.description}</p>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

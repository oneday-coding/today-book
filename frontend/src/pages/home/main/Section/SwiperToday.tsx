import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import useBookList from '../../../../hooks/useBookList';
import type { InfiniteData } from '@tanstack/react-query';
import type { Book } from '../../../../models/book.model';
import { EffectCoverflow } from 'swiper/modules';

interface SectionSwiperProps {
  LIMIT: number;
  swiperLeng: number | undefined;
}

export default function SectionSwiper({ LIMIT, swiperLeng }: SectionSwiperProps) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isLoading, isError } = useBookList('today', LIMIT);
  const allBooks = (data as InfiniteData<Book[]>)?.pages?.flat() ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <p>에러!</p>;
  if (!allBooks) return <p>데이터가 없습니다.</p>;

  return (
    <div className="relative w-full pb-8 ">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={swiperLeng}
        // loop={true}
        spaceBetween={30}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 80,
          modifier: 2.5,
          slideShadows: false,
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {allBooks.map((book, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={index}
              style={{ width: '160px' }}
              onClick={() => {
                navigate(`/detail/${book.isbn13}`);
              }}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="rounded-md shadow-md w-full h-full object-cover"
              />
              {isActive && (
                <p className="mt-3 text-sm text-mainBlack line-clamp-3 text-center">{book.title}</p>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

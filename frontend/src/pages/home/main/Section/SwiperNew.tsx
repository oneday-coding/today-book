import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import useBookList from '../../../../hooks/useBookList';
import Loading from '../../../../components/Loading';

interface SectionSwiperProps {
  LIMIT: number;
  swiperLeng: number | undefined;
}

export default function SectionSwiper({ LIMIT, swiperLeng }: SectionSwiperProps) {
  const navigate = useNavigate();
  const {bookData, error} = useBookList('new', 1, LIMIT);
  if (error) return <p>에러!</p>;
  if (!bookData) return <Loading />;

  return (
    <Swiper spaceBetween={12} slidesPerView={swiperLeng}>
      {bookData.slice(0, LIMIT).map((value, index) => {
        return (
          <SwiperSlide
            onClick={() => {
              navigate(`/detail/${value.isbn13}`);
            }}
            key={index}
          >
            <div className='book-container'>
              <img
                src={value.cover}
                alt={value.title}
                className="book-cover w-full"
                />
            </div>
            <div className="mt-2">
              <p className="book-title">
                {value.title}
              </p>
              <p className="book-author">{value.author}</p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

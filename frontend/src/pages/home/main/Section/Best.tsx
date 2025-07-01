import { useNavigate } from 'react-router-dom';
import useBookList from '../../../../hooks/useBookList';
import Loading from '../../../../components/Loading';


interface SectionListProps {
  LIMIT: number;
}

export default function SectionList({ LIMIT }: SectionListProps) {
  const navigate = useNavigate();
  const {bookData, error} = useBookList('best', 1, LIMIT);
  if (error) return <p>에러!</p>;
  if (!bookData) return <Loading />;

  return (
    <div>
      {bookData.slice(0, LIMIT).map((value, index) => {
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
              <div className='book-container'>
                <img className="book-cover" src={value.cover} alt={value.title} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

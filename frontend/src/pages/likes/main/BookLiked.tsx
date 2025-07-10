import { useNavigate } from 'react-router-dom';
import type { Book } from '../../../models/book.model';
import ButtonLike from './ButtonLike';

export default function BookLiked({ bookData }: { bookData: Book }) {
  const isbn13 = Number(bookData.isbn13);
  const navigate = useNavigate();

  function goDetail() {
    navigate(`/detail/${isbn13}`);
  }

  return (
    <div
      key={bookData.isbn13}
      className="relative shadow-sm bg-white rounded-md"
      onClick={(e) => {
        e.stopPropagation();
        goDetail();
      }}
    >
      <ButtonLike isbn13={isbn13} />
      <div className="book-container">
        <img className="book-cover" src={bookData.cover} alt={bookData.title} />
      </div>
      <div className="p-sm">
        <p className="book-title">{bookData.title}</p>
        <p className="book-author">{bookData.author}</p>
      </div>
    </div>
  );
}

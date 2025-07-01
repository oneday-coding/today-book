import { useParams } from 'react-router-dom';
import HeaderIndex from './header/HeaderIndex';
import BookList from './main/BookListIndex';


export default function ListIndex() {
  const { bookType } = useParams<{ bookType: string | undefined }>();

  return (
    <>
      <HeaderIndex bookType={bookType} />
      <main className="layout-main">
        <BookList bookType={bookType} />
      </main>
    </>
  );
}

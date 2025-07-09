import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackBtn';
import ButtonLike from './ButtonLike';

export default function HeaderIndex() {
  const { isbn13 } = useParams();

  return (
    <header className="layout-header">
      <BackButton />
      <h1 className="flex-1 flex justify-center">도서 상세</h1>
      <ButtonLike isbn13={Number(isbn13)} />
    </header>
  );
}

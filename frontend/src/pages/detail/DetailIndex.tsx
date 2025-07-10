import { useParams } from 'react-router-dom';
import BackButton from '../../components/buttons/BackButton';
import Header from '../../layout/Header';
import ButtonLike from './headerChildren/ButtonLike';
import MainIndex from './main/MainIndex';

export default function DetailIndex() {
  const { isbn13 } = useParams();

  return (
    <>
      <Header>
        <BackButton />
        <h1 className='page-title'>도서 상세</h1>
        <ButtonLike isbn13={Number(isbn13)} />
      </Header>
      <MainIndex />
    </>
  );
}

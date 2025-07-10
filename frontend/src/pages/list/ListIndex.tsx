import { useParams } from 'react-router-dom';
import BookList from './main/BookListIndex';
import Header from '../../layout/Header';
import BackButton from '../../components/buttons/BackButton';
import { bookTypeMap, type BookType } from '../../models/bookType.model';
import Main from '../../layout/Main';
import HeaderTitle from '../../components/HeaderTitle';

export default function ListIndex() {
  const { bookType } = useParams<{ bookType: string | undefined }>();

  return (
    <>
      <Header>
        <BackButton />
        <HeaderTitle title={ bookType ? bookTypeMap[bookType as BookType] : '책 리스트' } />
      </Header>
      <Main>
        <BookList bookType={bookType} />
      </Main>
    </>
  );
}

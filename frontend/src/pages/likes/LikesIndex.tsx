import Header from '../../layout/Header';
import LikeMainIndex from './main/LikeMainIndex';
import HeaderTitle from '../../components/HeaderTitle';
import Main from '../../layout/Main';

export default function LikesIndex() {
  return (
    <>
      <Header>
        <HeaderTitle title="찜 목록" />
      </Header>
      <Main>
        <LikeMainIndex />
      </Main>
    </>
  );
}

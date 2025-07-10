import Logo from '../../components/buttons/Logo';
import Header from '../../layout/Header';
import SearchWindowHome from './headerChildren/SearchWindowHome';
import MainIndex from './main/MainIndex';

export default function HomeIndex() {
  return (
    <>
      <Header>
        <Logo />
        <SearchWindowHome />
      </Header>
      <MainIndex />
    </>
  );
}

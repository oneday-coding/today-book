import Logo from '../../../components/Logo';
import SearchWindowHome from './SearchWindowHome';

export default function HeaderIndex() {
  return (
    <header className="layout-header">
      <Logo />
      <SearchWindowHome />
    </header>
  );
}

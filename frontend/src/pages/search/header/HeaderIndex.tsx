import BackBtn from '../../../components/BackBtn';
import SearchWindow from './SearchWindow';

export default function HeaderSearch() {
  return (
    <header className="shirink-0 py-3 px-4 h-16 shadow-sm flex items-center">
      <BackBtn />
      <SearchWindow />
    </header>
  );
}

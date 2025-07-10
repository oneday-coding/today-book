import Main from '../../../layout/Main';
import RecentSearchRecords from './RecentSearchRecords';
import SearchResults from './SearchResults';

export default function MainIndex() {
  return (
    <Main>
      <RecentSearchRecords />
      <SearchResults />
    </Main>
  );
}

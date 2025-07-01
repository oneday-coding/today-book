import RecentSearchRecords from './RecentSearchRecords';
import SearchResults from './SearchResults';

export default function MainIndex() {
  return (
    <main className="layout-main">
      <RecentSearchRecords />
      <SearchResults />
    </main>
  );
}

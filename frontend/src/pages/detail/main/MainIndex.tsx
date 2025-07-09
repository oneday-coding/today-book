import SectionInfo from './info/SectionInfo';
import ReviewIndex from './review/ReviewIndex';

export default function MainIndex() {
  return (
    <main className="layout-main">
      <SectionInfo />
      <ReviewIndex />
    </main>
  );
}

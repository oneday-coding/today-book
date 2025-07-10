import SectionList from './Best';
import SectionSwiperToday from './SwiperToday';
import SectionSwiperNew from './SwiperNew';
import MoreButton from '../../../../components/buttons/MoreButton';
import { bookTypeMap, type BookType } from '../../../../models/bookType.model';

interface propsHomeSection {
  listType: number;
  title: string;
  moreBtnFlag: boolean;
  swiperLeng?: number;
  LIMIT: number;
}

export default function HomeSection(props: propsHomeSection) {
  const { listType, title, moreBtnFlag, swiperLeng, LIMIT } = props;

  let SectionComponent;
  switch (listType) {
    case 1:
      SectionComponent = <SectionSwiperToday LIMIT={LIMIT} swiperLeng={swiperLeng} />;
      break;
    case 2:
      SectionComponent = <SectionSwiperNew LIMIT={LIMIT} swiperLeng={swiperLeng} />;
      break;
    case 3:
      SectionComponent = <SectionList LIMIT={LIMIT} />;
      break;
    default:
      SectionComponent = <SectionList LIMIT={LIMIT} />;
      break;
  }

  return (
    <section>
      <div className="pt-[32px] pb-[16px] flex justify-between items-center">
        <h2 className="section-title">{bookTypeMap[title as BookType] ?? title}</h2>
        {moreBtnFlag && <MoreButton title={title} />}
      </div>

      {SectionComponent}
    </section>
  );
}

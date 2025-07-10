import Main from '../../../layout/Main';
import SectionIndex from './Section/SectionIndex';

export default function MainIndex() {
  return (
    <Main>
      <SectionIndex listType={1} title={'today'} swiperLeng={1.8} moreBtnFlag={false} LIMIT={10} />

      <SectionIndex listType={2} title={'new'} swiperLeng={3.3} moreBtnFlag={true} LIMIT={10} />

      <SectionIndex listType={3} title={'best'} moreBtnFlag={true} LIMIT={3} />
    </Main>
  );
}

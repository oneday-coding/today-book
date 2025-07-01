import SectionIndex from './Section/SectionIndex';

export default function MainIndex() {
  return (
    <main className="layout-main">
      <SectionIndex
        listType={1}
        title={'today'}
        swiperLeng={1.2}
        moreBtnFlag={false}
        LIMIT={10}
      />

      <SectionIndex
        listType={2}
        title={'new'}
        swiperLeng={3.3}
        moreBtnFlag={true}
        LIMIT={10}
      />

      <SectionIndex listType={3} title={'best'} moreBtnFlag={true} LIMIT={3} />
    </main>
  );
}

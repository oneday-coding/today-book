import SectionIndex from './Section/SectionIndex';

export default function MainIndex() {
  return (
    <main className="flex-1 overflow-y-auto p-[16px]">
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

      <SectionIndex listType={3} title={'베스트셀러'} moreBtnFlag={true} LIMIT={3} />
    </main>
  );
}

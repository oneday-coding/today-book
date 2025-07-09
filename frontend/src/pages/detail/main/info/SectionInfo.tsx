import { useParams } from 'react-router-dom';
import useBookDetail from '../../../../hooks/useBookDetail';
import { useState } from 'react';

export default function SectionInfo() {
  const { isbn13 } = useParams<string>();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: bookData, isLoading, isError } = useBookDetail(Number(isbn13));

  if (isError) return <p>에러!</p>;
  if (isLoading || !bookData) return <p>로딩 중...</p>;

  const description = bookData.description;
  const isLongText = description.length > 100;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className="p-[16px] flex flex-col items-center justify-center">
        <img className="block w-[192px] h-[256px] rounded-[16px] mb-[24px]" src={bookData.cover} />
        <strong className="block text-[20px] font-bold mb-[8px]">{bookData.title}</strong>
        <p className="text-[14px]">{bookData.author} 저</p>
      </div>
      <div className="pt-[24px]">
        <h3 className="text-[18px] mb-[14px]">줄거리</h3>
        <p className="text-[14px]">
          {isLongText && !isExpanded ? `${description.substring(0, 100)}...` : description}
        </p>
        {isLongText && (
          <button onClick={toggleExpansion} className="text-mainBlue text-[14px] mt-[8px]">
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>
    </div>
  );
}

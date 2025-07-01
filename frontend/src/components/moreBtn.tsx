import { useNavigate } from 'react-router-dom';

interface MoreButtonProps {
  title: string;
}

export default function MoreButton({ title }: MoreButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(`/list/${title}`);
      }}
      type="button"
      className="text-mainBlue text-xs pr-4"
      style={{
        background:
          "url('/icons/button/arrow_blue.svg') right calc(50% + 1px)/20px 20px no-repeat",
      }}
    >
      더보기
    </button>
  );
}




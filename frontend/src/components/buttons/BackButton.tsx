import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="w-[32px] h-[32px]"
      style={{ backgroundImage: "url('/icons/button/arrow_black.svg')" }}
      onClick={() => navigate(-1)}
    ></button>
  );
}

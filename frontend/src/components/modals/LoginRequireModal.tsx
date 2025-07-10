import { useNavigate } from 'react-router-dom';

interface LoginRequiredModalProps {
  onCancel: () => void;
}

export default function LoginRequiredModal({ onCancel }: LoginRequiredModalProps) {
  const navigate = useNavigate();

  function onLogin() {
    navigate('/login');
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[16px] w-[320px] px-[24px] py-[32px] text-center shadow-lg">
        <h2 className="text-[16px] font-semibold text-mainBlack mb-6">
          로그인이 필요한 기능입니다
        </h2>
        <button
          onClick={onLogin}
          className="w-full h-[44px] bg-mainBlue text-white rounded-[8px] text-[14px] font-medium mb-[12px]"
        >
          로그인하기
        </button>
        <button
          onClick={onCancel}
          className="w-full h-[44px] border border-gray-200 text-[14px] text-mainBlack rounded-[8px]"
        >
          취소
        </button>
      </div>
    </div>
  );
}

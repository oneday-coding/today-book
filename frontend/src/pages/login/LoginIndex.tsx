import Logo from '../../components/buttons/Logo';

export default function Login() {
  const loginUrl = import.meta.env.VITE_API_URL + '/api/auth/kakao';

  return (
    <div className="layout-main flex flex-col justify-center items-center">
      <Logo fontSize="30px" />
      <p className="text-sm text-gray-500 mt-[14px]">독서의 즐거움을 함께 나누세요</p>
      <button
        className="flex items-center justify-center gap-2 bg-[#FEE500] rounded-[8px] w-full max-w-[360px] h-[48px] mt-[48px]"
        onClick={() => {
          window.location.href = loginUrl;
        }}
      >
        <img src="/icons/logo/kakao.svg" alt="카카오 로고" />
        <span className="test-sm">카카오로 시작하기</span>
      </button>
    </div>
  );
}

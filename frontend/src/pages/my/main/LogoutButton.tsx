import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  function logout() {
    // 백엔드에서 만들어준 쿠키가 => HttpOnly 쿠키라면 프론트엔드에서 삭제 불가

    // HttpOnly가 아니고 JS에서 삭제가 가능하다면 아래처럼 만료 가능
    document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';

    navigate('/');
  }

  return (
    <button className="w-full h-[48px] bg-mainGray text-textSecondary rounded-sm" onClick={logout}>
      로그아웃
    </button>
  );
}

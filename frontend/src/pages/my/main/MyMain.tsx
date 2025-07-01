import LogoutButton from './LogoutButton';
import useUserQuery from '../../../hooks/useUserQuery';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';

export default function MyMain() {
  const navigate = useNavigate();
  const { data: userInfo, isLoading, isError } = useUserQuery();

  useEffect(() => {
    if (isError) navigate('/login');
  }, [isError]);

  if (isLoading) return <Loading />;
  if (isError) return <div>에러가 발생하였습니다.</div>;

  return (
    <main className="layout-main space-y-6">
      <section className="p-4 flex items-center gap-5 shadow-sm rounded-md">
        <div className="w-16 h-16 rounded-full overflow-hidden border-[2px] border-mainBlue">
          <img
            className="w-full h-full object-cover block"
            src={userInfo?.profileImage || '/icons/imgs/user_dummy.png'}
            alt="프로필 이미지"
          />
        </div>
        <div>
          <p className="text-base text-textPrimary">{userInfo?.name || '유저 이름'}</p>
          <p className="mt-1 text-xs text-textTertiary">{userInfo?.email || '유저 이메일'}</p>
        </div>
      </section>

      <LogoutButton />
    </main>
  );
}

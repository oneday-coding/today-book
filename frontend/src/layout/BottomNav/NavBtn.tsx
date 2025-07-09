import { NavLink } from 'react-router-dom';

interface NavBtnProps {
  href: string;
}

const navConfig: Record<string, { label: string; iconUrl: string }> = {
  '/': { label: '홈', iconUrl: '/icons/nav/home/' },
  '/search': { label: '검색', iconUrl: '/icons/nav/search/' },
  '/likes': { label: '찜', iconUrl: '/icons/nav/likes/' },
  '/my': { label: '내 정보', iconUrl: '/icons/nav/my/' },
};

export default function NavBtn({ href }: NavBtnProps) {
  const config = navConfig[href];

  return (
    // react-router-dom의 <NavLink> 컴포넌트는
    // 현재 브라우저의 URL 경로 (location.pathname)와
    // NavLink의 to 속성 값을 비교해서 isActive 상태를 판단함
    <NavLink to={href} className={`w-[90px] h-[100%] flex flex-col justify-between items-center`}>
      {({ isActive }) => (
        <>
          <img
            className="w-[24px] h-[24px]"
            src={`${config.iconUrl}${isActive ? 'on' : 'off'}.svg`}
            alt={config.label}
          />
          <span
            className={`

            ${isActive ? '#4F46E5' : ''}
          `}
          >
            {config.label}
          </span>
        </>
      )}
    </NavLink>
  );
}

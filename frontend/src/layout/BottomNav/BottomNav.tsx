import NavBtn from './NavBtn';

export default function BottomNav() {
  const classNames =
    'bg-white absolute bottom-0 left-0 w-full flex justify-center items-center p-[8px] h-[62px] shadow-sm border-t border-gray-200';

  return (
    <nav className={classNames}>
      <NavBtn href="/" />
      <NavBtn href="/search" />
      <NavBtn href="/likes" />
      <NavBtn href="/my" />
    </nav>
  );
}

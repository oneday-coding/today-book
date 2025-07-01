import NavBtn from './NavBtn';

export default function BottomNav() {
  return (
    <nav className="shirink-0 p-[8px] w-[100%] flex justify-center items-center h-[62px] shadow-sm border-t border-gray-200">
      <NavBtn href="/" />
      <NavBtn href="/search" />
      <NavBtn href="/favorites" />
      <NavBtn href="/my" />
    </nav>
  );
}

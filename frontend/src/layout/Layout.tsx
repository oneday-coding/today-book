import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav/BottomNav';

export default function Layout() {

  return (
    <div className="layout">
      <Outlet />
      <BottomNav />
    </div>
  );
}

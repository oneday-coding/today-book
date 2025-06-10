import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/HomeIndex';
import Search from '../pages/Search/SearchIndex';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search',
    element: <Search />,
  },
]);

export default router;

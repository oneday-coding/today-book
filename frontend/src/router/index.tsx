import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import HomeIndex from '../pages/home/HomeIndex';
import MyIndex from '../pages/my/MyIndex';
import FavoritesIndex from '../pages/favorites/FavoritesIndex';
import SearchIndex from '../pages/search/SearchIndex';
import DetailIndex from '../pages/detail/DetailIndex';
import ListIndex from '../pages/list/ListIndex';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // 공통 레이아웃
    children: [
      { index: true, element: <HomeIndex /> },
      { path: 'detail/:isbn13', element: <DetailIndex /> },
      { path: 'list/:bookType', element: <ListIndex /> },
      { path: 'search', element: <SearchIndex /> },
      { path: 'favorites', element: <FavoritesIndex /> },
      { path: 'my', element: <MyIndex /> },
    ],
  },
]);

export default router;

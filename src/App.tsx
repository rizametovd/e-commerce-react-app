import classes from './App.module.css';
import { PATHS } from './constants/routes';
import { useRoutes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { fetchProducts } from './store/ProductSlice';
import CategoryPage from './components/pages/showcasePages/CategoryPage/CategoryPage';
import ProductsPage from './components/pages/adminPages/ProductsPage/ProductsPage';
import SettingsPage from './components/pages/adminPages/SettingsPage/SettingsPage';
import AdminPage from './components/pages/adminPages/AdminPage/AdminPage';
import DiscountProductsPage from './components/pages/showcasePages/DiscountProductsPage/DiscountProductsPage';
import ShowcasePage from './components/pages/showcasePages/ShowcasePage/ShowcasePage';
import { getFromLocalStorage } from './store/UserSlice';
import WishlistPage from './components/pages/showcasePages/WishlistPage/WishlistPage';
import ProductPage from './components/pages/showcasePages/ProductPage/ProductPage';
import Loader from './components/UI/Loader/Loader';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, products } = useSelector((state: RootState) => state.product);
  const isDataLoaded = !isLoading && products.length > 0;

  const routes = useRoutes([
    {
      path: PATHS.showcase,
      element: <ShowcasePage />,
      children: [
        {
          path: '/',
          element: isDataLoaded ? <DiscountProductsPage /> : <Loader />,
        },
        {
          path: ':url',
          children: [
            {
              index: true,
              element: isDataLoaded ? <CategoryPage /> : <Loader />,
            },
            {
              path: ':id',
              element: isDataLoaded ? <ProductPage /> : <Loader />,
            },
          ],
        },
        { path: PATHS.wishlist, element: isDataLoaded ? <WishlistPage /> : <Loader /> },
      ],
    },
    {
      path: PATHS.admin,
      element: <AdminPage />,
      children: [
        {
          path: PATHS.products,
          element: <ProductsPage />,
        },
        {
          path: PATHS.settings,
          element: <SettingsPage />,
        },
      ],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getFromLocalStorage('likes'));
        dispatch(fetchProducts());
      } catch (error) {
        console.log('Fetch error App.tsx:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return <div className={classes.app}>{routes}</div>;
};

export default App;

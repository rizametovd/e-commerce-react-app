import classes from './App.module.css';
import { PATHS } from './constants/routes';
import { useRoutes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
// import { fetchCategories } from './store/CategorySlice';
import { fetchProducts } from './store/ProductSlice';
// import { fetchBrands } from './store/BrandSlice';
import CategoryPage from './components/pages/showcasePages/CategoryPage/CategoryPage';
import ProductsPage from './components/pages/adminPages/ProductsPage/ProductsPage';
import SettingsPage from './components/pages/adminPages/SettingsPage/SettingsPage';
import AdminPage from './components/pages/adminPages/AdminPage/AdminPage';
import DiscountProductsPage from './components/pages/showcasePages/DiscountProductsPage/DiscountProductsPage';
import ShowcasePage from './components/pages/showcasePages/ShowcasePage/ShowcasePage';
import { getFromLocalStorage } from './store/UserSlice';
import WishlistPage from './components/pages/showcasePages/WishlistPage/WishlistPage';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const routes = useRoutes([
    {
      path: PATHS.showcase,
      element: <ShowcasePage />,
      children: [
        {
          path: '/',
          element: <DiscountProductsPage />,
        },
        {
          path: '/:url',
          element: <CategoryPage />,
        },
        { path: PATHS.wishlist, element: <WishlistPage /> },
      ],
    },
    {
      path: PATHS.admin,
      element: <AdminPage />,
      children: [
        { path: PATHS.products, element: <ProductsPage /> },
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
        // await Promise.all([
        //   dispatch(fetchBrands()),
        //   dispatch(fetchCategories()),
        //   dispatch(getFromLocalStorage('likes')),
        // ]);

        dispatch(getFromLocalStorage('likes'))
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

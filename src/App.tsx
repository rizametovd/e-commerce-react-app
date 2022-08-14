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
import CartPage from './components/pages/showcasePages/CartPage/CartPage';
import OrdersPage from './components/pages/adminPages/OrdersPage/OrdersPage';
import CheckoutSuccessPage from './components/pages/showcasePages/CheckoutSuccessPage/CheckoutSuccessPage';
import NotFound from './components/pages/showcasePages/NotFound/NotFound';

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
        {
          path: PATHS.cart,
          element: isDataLoaded ? <CartPage /> : <Loader />,
        },
        {
          path: `${PATHS.cart}/${PATHS.success}`,
          element: <CheckoutSuccessPage />,
        },
      ],
    },
    {
      path: PATHS.admin,

      element: <AdminPage />,
      children: [
        {
          index: true,
          path: PATHS.orders,
          element: <OrdersPage />,
        },
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

    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getFromLocalStorage('wishlist'));
        dispatch(getFromLocalStorage('cart'));
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

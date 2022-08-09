import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { handleWishlist, setToLocalStorage } from '../../../store/UserSlice';
import { AlertType, Product } from '../../../types/common';
import { hideAlert, showAlert } from '../../../store/CommonSlice';
import LoadMore from '../../UI/LoadMore/LoadMore';
import Toast from '../../UI/Toast/Toast';
import ProductCard from '../ProductCard/ProductCard';
import classes from './ProductCardList.module.css';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../constants/routes';

interface IProductCardListProps {
  products: Product[];
}

const PRODUCT_LIST_LIMIT = 10;

const ProductCardList: React.FC<IProductCardListProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state: RootState) => state.user);
  const { alert } = useSelector((state: RootState) => state.common);
  const [productsToRender, setProductsToRender] = useState<Product[]>([]);
  const [count, setCount] = useState(PRODUCT_LIST_LIMIT);
  const isLoadMoreVisible = products.length > count;

  useEffect(() => {
    setProductsToRender(products.slice(0, PRODUCT_LIST_LIMIT));
    setCount(PRODUCT_LIST_LIMIT);
  }, [products]);

  const toastHandler = () => {
    navigate(PATHS.wishlist)
    dispatch(hideAlert())
  }

  const wishlistHandler = (id: Product['id']) => {
    const isProductLiked = wishlist.includes(id);
    dispatch(handleWishlist(id));
    dispatch(setToLocalStorage('likes'));

    if (isProductLiked) {
      dispatch(showAlert({ type: AlertType.Info, message: 'Удалено из избранного' }));
    } else {
      dispatch(showAlert({ type: AlertType.Success, message: 'Добавлено в избранное', isAction: true }));
    }
  };

  const showMoreHandler = (count: number) => {
    setCount(count);
    const list = products.slice(0, count);
    setProductsToRender(list);
  };

  return (
    <div className={classes['product-card-list']}>
      <Toast
        message={alert.message}
        type={alert.type}
        onAction={toastHandler}
        actionName={(alert.isAction && 'Перейти в избранное') || ''}
      />
      <ul className={classes.list}>
        {productsToRender.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            discount={product.discount}
            brand={product.brand.name}
            category={product.category.name}
            onWishlistClick={() => wishlistHandler(product.id)}
            isAddedToWishlist={wishlist.includes(product.id)}
          />
        ))}
      </ul>
      {isLoadMoreVisible && (
        <LoadMore
          count={count}
          itemsListLength={products.length}
          onClick={showMoreHandler}
          itemsLimit={PRODUCT_LIST_LIMIT}
        />
      )}
    </div>
  );
};

export default ProductCardList;

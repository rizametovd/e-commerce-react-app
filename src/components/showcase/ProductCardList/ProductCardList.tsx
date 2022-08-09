import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { handleWishlist, setToLocalStorage } from '../../../store/UserSlice';
import { Product } from '../../../types/common';
import LoadMore from '../../UI/LoadMore/LoadMore';
import ProductCard from '../ProductCard/ProductCard';
import classes from './ProductCardList.module.css';

interface IProductCardListProps {
  products: Product[];
}

const PRODUCT_LIST_LIMIT = 20;

const ProductCardList: React.FC<IProductCardListProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist } = useSelector((state: RootState) => state.user);
  const [productsToRender, setProductsToRender] = useState<Product[]>([]);
  const countRef = useRef(PRODUCT_LIST_LIMIT);

  useEffect(() => {
    setProductsToRender(products.slice(0, PRODUCT_LIST_LIMIT));
  }, [products]);

  const wishlistHandler = (id: Product['id']) => {
    dispatch(handleWishlist(id));
    dispatch(setToLocalStorage('likes'));
  };

  const showMoreHandler = (count: number) => {
    countRef.current = count;
    const list = products.slice(0, countRef.current);
    setProductsToRender(list);
  };

  return (
    <div className={classes['product-card-list']}>
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
      <LoadMore count={countRef.current} itemsListLength={products.length} onClick={showMoreHandler} itemsLimit={PRODUCT_LIST_LIMIT} />
    </div>
  );
};

export default ProductCardList;

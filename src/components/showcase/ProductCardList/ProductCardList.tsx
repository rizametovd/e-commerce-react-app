import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { wishListHandler } from '../../../store/UserSlice';
import { Product } from '../../../types/common';
import LoadMore from '../../UI/LoadMore/LoadMore';
import ProductCard from '../ProductCard/ProductCard';
import classes from './ProductCardList.module.css';

interface IProductCardListProps {
  products: Product[];
}

const PRODUCT_LIST_LIMIT = 10;

const ProductCardList: React.FC<IProductCardListProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist } = useSelector((state: RootState) => state.user);
  const [productsToRender, setProductsToRender] = useState<Product[]>([]);
  const [count, setCount] = useState(PRODUCT_LIST_LIMIT);
  const isLoadMoreVisible = products.length > count;

  useEffect(() => {
    setProductsToRender(products.slice(0, PRODUCT_LIST_LIMIT));
    setCount(PRODUCT_LIST_LIMIT);
  }, [products]);

  const handleWishlist = (id: Product['id']) => {
    const isWished = wishlist.includes(id);
    dispatch(wishListHandler({id, isWished}))
  };

  const showMoreHandler = (count: number) => {
    setCount(count);
    const list = products.slice(0, count);
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
            brand={product.brand}
            category={product.category}
            onWishlistClick={() => handleWishlist(product.id)}
            isAddedToWishlist={wishlist.includes(product.id)}
            id={product.id}
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

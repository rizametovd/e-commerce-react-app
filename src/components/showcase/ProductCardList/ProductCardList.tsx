import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { handleWishlist, setToLocalStorage } from '../../../store/UserSlice';
import { Product } from '../../../types/common';
import ProductCard from '../ProductCard/ProductCard';
import classes from './ProductCardList.module.css';

interface IProductCardListProps {
  products: Product[];
}

const ProductCardList: React.FC<IProductCardListProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist } = useSelector((state: RootState) => state.user);

  const wishlistHandler = (id: Product['id']) => {
    dispatch(handleWishlist(id));
    dispatch(setToLocalStorage('likes'));
  };

  return (
    <ul className={classes.list}>
      {products.map((product) => (
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
  );
};

export default ProductCardList;

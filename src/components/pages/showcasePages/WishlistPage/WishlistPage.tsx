import classes from './WishlistPage.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ProductCardList from '../../../showcase/ProductCardList/ProductCardList';
import Loader from '../../../UI/Loader/Loader';
import Placeholder from '../../../UI/Placeholder/Placeholder';
import { NO_PRODUCTS_MESSAGE } from '../../../../constants/messages';

const WishlistPage: React.FC = () => {
  const { products, isLoading } = useSelector((state: RootState) => state.product);
  const { wishlist } = useSelector((state: RootState) => state.user);
  const wishlistProducts = products.filter((product) => wishlist.includes(product.id));
  const hasProducts = !isLoading && wishlistProducts.length > 0;
  const noProducts = !isLoading && wishlistProducts.length === 0;

  console.log('isLoading:', isLoading);

  return (
    <section className={classes['category-page']}>
      <div className={classes['header-wrapper']}>
        <h1 className={classes.title}>Избранные товары</h1>
      </div>

      <div className={classes['body-wrapper']}>
        {isLoading && <Loader />}

        {hasProducts && <ProductCardList products={wishlistProducts} />}

        {noProducts && <Placeholder text={NO_PRODUCTS_MESSAGE} size={'38px'} />}
      </div>
    </section>
  );
};

export default WishlistPage;

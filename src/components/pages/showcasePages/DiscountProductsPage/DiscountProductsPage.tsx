import { useSelector } from 'react-redux';
import { NO_DISCOUNTED_PRODUCTS } from '../../../../constants/messages';
import { RootState } from '../../../../store/store';
import ProductCardList from '../../../showcase/ProductCardList/ProductCardList';
import Loader from '../../../UI/Loader/Loader';
import Placeholder from '../../../UI/Placeholder/Placeholder';
import classes from './DiscountProductsPage.module.css';

interface IDiscountProductsPageProps {}

const DiscountProductsPage: React.FC<IDiscountProductsPageProps> = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.product);
  const discountedProducts = products.filter((product) => product.discount);
  const hasProducts = discountedProducts.length > 0;

  return (
    <section className={classes['discount-products']}>
      <h2 className={classes.title}>Скидки</h2>

      {isLoading && <Loader />}

      {!isLoading && error.isError && <Placeholder text={error.message} size={'38px'} />}
      {!isLoading && !hasProducts && !error.isError && <Placeholder text={NO_DISCOUNTED_PRODUCTS} size={'38px'} />}

      {!isLoading && hasProducts && <ProductCardList products={discountedProducts} />}
    </section>
  );
};

export default DiscountProductsPage;

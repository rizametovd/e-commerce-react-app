import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ProductCardList from '../../../showcase/ProductCardList/ProductCardList';
import Loader from '../../../UI/Loader/Loader';
import classes from './DiscountProductsPage.module.css';

interface IDiscountProductsPageProps {}

const DiscountProductsPage: React.FC<IDiscountProductsPageProps> = () => {
  const { products, isLoading } = useSelector((state: RootState) => state.product);
  const discountedProducts = products.filter((product) => product.discount);

  return (
    <section className={classes['discount-products']}>
      <h2 className={classes.title}>Скидки</h2>

      {isLoading ? <Loader /> : <ProductCardList products={discountedProducts} />}
    </section>
  );
};

export default DiscountProductsPage;

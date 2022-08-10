import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ProductCardList from '../../../showcase/ProductCardList/ProductCardList';
import Loader from '../../../UI/Loader/Loader';
import Placeholder from '../../../UI/Placeholder/Placeholder';
import { NO_PRODUCTS_MESSAGE } from '../../../../constants/messages';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import SectionHeader from '../../../layouts/showcaseLayouts/Section/SectionHeader/SectionHeader';
import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';

const WishlistPage: React.FC = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.product);
  const { wishlist } = useSelector((state: RootState) => state.user);
  const wishlistProducts = products.filter((product) => wishlist.includes(product.id));
  const hasProducts = wishlistProducts.length > 0;

  return (
    <Section>
      <>
        <SectionHeader title={'Избранные товары'} />

        <SectionBody>
          <>
            {isLoading && <Loader />}

            {!isLoading && error.isError && <Placeholder text={error.message} size={'38px'} />}
            {!isLoading && !hasProducts && !error.isError && <Placeholder text={NO_PRODUCTS_MESSAGE} size={'38px'} />}
            {!isLoading && hasProducts && <ProductCardList products={wishlistProducts} />}
          </>
        </SectionBody>
      </>
    </Section>
  );
};

export default WishlistPage;

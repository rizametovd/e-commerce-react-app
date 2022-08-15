import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ProductCardList from '../../../showcase/ProductCardList/ProductCardList';
import Placeholder from '../../../UI/Placeholder/Placeholder';
import { NO_PRODUCTS_MESSAGE } from '../../../../constants/messages';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import SectionHeader from '../../../layouts/showcaseLayouts/Section/SectionHeader/SectionHeader';
import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';
import SectionBodyGrid from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBodyGrid/SectionBodyGrid';
import Filter from '../../../showcase/Filter/Filter';
import useFilterByBrand from '../../../../hooks/useFilterByBrand';

const WishlistPage: React.FC = () => {
  const { products, error } = useSelector((state: RootState) => state.product);
  const { wishlist } = useSelector((state: RootState) => state.user);
  const { brands } = useSelector((state: RootState) => state.brand);
  const wishlistProducts = products.filter((product) => wishlist.includes(product.id));
  const { checkFilterItem, productsTorender, checkboxItems } = useFilterByBrand(wishlistProducts, brands);
  const hasProducts = wishlistProducts.length > 0;

  return (
    <Section>
      <>
        <SectionHeader title={'Избранные товары'} />
        <SectionBody>
          <SectionBodyGrid displayBlock={!hasProducts}>
            <>
              {hasProducts && <Filter checkboxItems={checkboxItems} onCheck={checkFilterItem} />}
              {error.isError && <Placeholder text={error.message} size={'38px'} />}
              {!hasProducts && !error.isError && <Placeholder text={NO_PRODUCTS_MESSAGE} size={'38px'} />}
              {hasProducts && <ProductCardList products={productsTorender} />}
            </>
          </SectionBodyGrid>
        </SectionBody>
      </>
    </Section>
  );
};

export default WishlistPage;

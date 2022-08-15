import { useSelector } from 'react-redux';
import { NO_DISCOUNTED_PRODUCTS } from '../../../../constants/messages';
import useFilterByBrand from '../../../../hooks/useFilterByBrand';
import { RootState } from '../../../../store/store';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';
import SectionBodyGrid from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBodyGrid/SectionBodyGrid';
import SectionHeader from '../../../layouts/showcaseLayouts/Section/SectionHeader/SectionHeader';
import Filter from '../../../showcase/Filter/Filter';
import ProductCardList from '../../../showcase/ProductCardList/ProductCardList';
import Placeholder from '../../../UI/Placeholder/Placeholder';

interface IDiscountProductsPageProps {}

const DiscountProductsPage: React.FC<IDiscountProductsPageProps> = () => {
  const { products, error } = useSelector((state: RootState) => state.product);
  const { brands } = useSelector((state: RootState) => state.brand);
  const discountedProducts = products.filter((product) => product.discount);
  const { checkFilterItem, productsTorender, checkboxItems } = useFilterByBrand(discountedProducts, brands);
  const hasProducts = discountedProducts.length > 0;

  return (
    <Section>
      <>
        <SectionHeader title={'Скидки'} />
        <SectionBody>
          <SectionBodyGrid>
            <>
              <Filter checkboxItems={checkboxItems} onCheck={checkFilterItem} />
              {error.isError && <Placeholder text={error.message} size={'38px'} />}
              {!hasProducts && !error.isError && <Placeholder text={NO_DISCOUNTED_PRODUCTS} size={'38px'} />}

              {hasProducts && <ProductCardList products={productsTorender} />}
            </>
          </SectionBodyGrid>
        </SectionBody>
      </>
    </Section>
  );
};

export default DiscountProductsPage;

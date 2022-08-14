import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ProductCardList from '../../../showcase/ProductCardList/ProductCardList';
import { Category } from '../../../../types/common';
import Placeholder from '../../../UI/Placeholder/Placeholder';
import { NO_PRODUCTS_MESSAGE } from '../../../../constants/messages';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import SectionHeader from '../../../layouts/showcaseLayouts/Section/SectionHeader/SectionHeader';
import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';
import NotFound from '../NotFound/NotFound';
import Filter from '../../../showcase/Filter/Filter';
import useFilter from '../../../../hooks/useFilter';
import SectionBodyGrid from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBodyGrid/SectionBodyGrid';

const CategoryPage: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const { url } = useParams();
  const { categories } = useSelector((state: RootState) => state.category);
  const { brands } = useSelector((state: RootState) => state.brand);
  const categoryProducts = products.filter((product) => product.category.url === url);
  const category = categories.find((category) => category.url === url) as Category;
  const hasProducts = categoryProducts.length > 0;
  const { checkFilterItem, productsTorender, checkboxItems } = useFilter(categoryProducts, brands);

  if (!category) {
    return <NotFound />;
  }

  return (
    <Section>
      <>
        <SectionHeader title={category.name} description={category.description} />
        <SectionBody>
          <SectionBodyGrid>
            <>
              <Filter checkboxItems={checkboxItems} onCheck={checkFilterItem} />

              {hasProducts && <ProductCardList products={productsTorender} />}
              {!hasProducts && <Placeholder text={NO_PRODUCTS_MESSAGE} size={'38px'} />}
            </>
          </SectionBodyGrid>
        </SectionBody>
      </>
    </Section>
  );
};

export default CategoryPage;

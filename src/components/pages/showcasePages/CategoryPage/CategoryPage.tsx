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

const CategoryPage: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const { url } = useParams();
  const { categories } = useSelector((state: RootState) => state.category);
  const categoryProducts = products.filter((product) => product.category.url === url);
  const { name, description } = categories.find((category) => category.url === url) as Category;
  const hasProducts = categoryProducts.length > 0;

  return (
    <Section>
      <>
        <SectionHeader title={name} description={description} />
        <SectionBody>
          <>
            {hasProducts && <ProductCardList products={categoryProducts} />}
            {!hasProducts && <Placeholder text={NO_PRODUCTS_MESSAGE} size={'38px'} />}
          </>
        </SectionBody>
      </>
    </Section>
  );
};

export default CategoryPage;

import Section from '../../../layouts/showcaseLayouts/Section/Section';
import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';
import SectionHeader from '../../../layouts/showcaseLayouts/Section/SectionHeader/SectionHeader';
import Cart from '../../../showcase/Cart/Cart';
// import classes from './CartPage.module.css';

const CartPage: React.FC = () => {
  return (
    <Section>
      <>
        <SectionHeader title={'Корзина'} />
        <SectionBody>
          <Cart />
        </SectionBody>
      </>
    </Section>
  );
};

export default CartPage;

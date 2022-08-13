import classes from './CheckoutSuccessPage.module.css';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../../constants/routes';

const CheckoutSuccessPage: React.FC = () => {
  return (
    <Section>
      <SectionBody>
        <div className={classes['checkout-success']}>
          <span className={classes.title}>Заказ оформлен</span>
          <span className={classes.subtitle}>Вы будете перенаправлены на главную страницу через 10 секунд</span>
          <span className={classes.text}>Заказ можно посмотреть в админке</span>

          <Link to={`${PATHS.admin}${PATHS.orders}`} className={classes.link}>
            Перейти в админку
          </Link>
        </div>
      </SectionBody>
    </Section>
  );
};

export default CheckoutSuccessPage;

import classes from './CheckoutSuccessPage.module.css';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from '../../../../constants/routes';
import { useEffect, useState } from 'react';

const CheckoutSuccessPage: React.FC = () => {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (counter === 0) {
      navigate(PATHS.showcase);
    }

    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter(counter - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [counter, navigate]);

  return (
    <Section>
      <SectionBody>
        <div className={classes['checkout-success']}>
          <span className={classes.title}>Заказ оформлен</span>
          <span className={classes.subtitle}>Вы будете перенаправлены на главную страницу через {counter} секунд</span>
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

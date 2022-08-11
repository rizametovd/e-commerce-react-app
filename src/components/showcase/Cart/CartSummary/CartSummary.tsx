import { CartItem } from '../../../../types/common';
import classes from './CartSummary.module.css';

interface ICartSummaryProps {
  price: CartItem['totalPrice'];
  weight: CartItem['weight'];
  profit: CartItem['profit'];
  quantity: CartItem['quantity'];
}

const CartSummary: React.FC<ICartSummaryProps> = ({ price, weight, profit, quantity }) => {
  return (
    <div className={classes['cart-summary']}>
      <div className={`${classes['cart-summary-row']} ${classes.heading}`}>
        <span>Итого</span>
        <span>{price} ₽</span>
      </div>

      <div className={classes['cart-summary-row']}>
        <span>Выгода</span>
        <span className={classes['profit-amount']}>{profit} ₽</span>
      </div>

      <div className={classes['cart-summary-row']}>
        <span>Всего товаров</span>
        <span>{quantity} шт</span>
      </div>

      <div className={classes['cart-summary-row']}>
        <span>Вес</span>
        <span>{weight} кг</span>
      </div>
    </div>
  );
};

export default CartSummary;

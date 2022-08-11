import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';
import CartSummary from './CartSummary/CartSummary';

const Cart: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.user);
  const price = cart.reduce((res, val) => res + val.totalPrice, 0);
  const weight = cart.reduce((res, val) => res + val.totalWeight, 0);
  const profit = cart.reduce((res, { profit = 0 }) => res + profit, 0);
  const quantity = cart.reduce((res, { quantity }) => res + quantity, 0);

  return (
    <div className={classes.cart}>
      <div className={classes['cart-items-wrapper']}>
        {cart.map((cartItem) => (
          <CartItem key={cartItem.id} {...cartItem} />
        ))}
      </div>

      <CartSummary price={price} weight={weight} profit={profit} quantity={quantity} />
    </div>
  );
};

export default Cart;

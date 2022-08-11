import { useDispatch, useSelector } from 'react-redux';
import { NO_PRODUCTS_IN_CART } from '../../../constants/messages';
import { AppDispatch, RootState } from '../../../store/store';
import { removeProductFromCart, wishListHandler } from '../../../store/UserSlice';
import Placeholder from '../../UI/Placeholder/Placeholder';
import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';
import CartSummary from './CartSummary/CartSummary';

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.user);
  const { wishlist } = useSelector((state: RootState) => state.user);
  const price = cart.reduce((res, val) => res + val.totalPrice, 0);
  const weight = +cart.reduce((res, val) => res + val.totalWeight, 0).toFixed(2);
  const profit = cart.reduce((res, { profit = 0 }) => res + profit, 0);
  const quantity = cart.reduce((res, { quantity }) => res + quantity, 0);
  const hasProducts = cart.length > 0;

  return (
    <>
      {!hasProducts && <Placeholder text={NO_PRODUCTS_IN_CART} />}

      {hasProducts && (
        <div className={classes.cart}>
          <div className={classes['cart-items-wrapper']}>
            {cart.map((cartItem) => {
              const isWished = wishlist.includes(cartItem.id);
              return (
                <CartItem
                  key={cartItem.id}
                  {...cartItem}
                  isWished={isWished}
                  onWishlist={() => dispatch(wishListHandler({ id: cartItem.id, isWished }))}
                  onRemove={() => dispatch(removeProductFromCart(cartItem.id))}
                />
              );
            })}
          </div>
          <CartSummary price={price} weight={weight} profit={profit} quantity={quantity} />
        </div>
      )}
    </>
  );
};

export default Cart;

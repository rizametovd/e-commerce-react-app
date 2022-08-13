import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { decrement, increment, removeProductFromCart, setToLocalStorage } from '../../../store/UserSlice';
import classes from './QuantityBlock.module.css';

interface IQuantityBlockProps {
  id: string;
  disableDecrement?: boolean;
  background?: string,
}

const QuantityBlock: React.FC<IQuantityBlockProps> = ({ id, disableDecrement = false, background = '#fff' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.user);
  const productInCart = cart.find((cartItem) => cartItem.productId === id);
  const isDisabled = disableDecrement && productInCart?.quantity === 1;

  const incrementHandler = () => {
    dispatch(increment(id));
    dispatch(setToLocalStorage('cart'))
  };

  const decrementHandler = () => {
    dispatch(decrement(id));
    dispatch(setToLocalStorage('cart'))

    if (productInCart?.quantity === 1) {
      dispatch(removeProductFromCart(id));
      dispatch(setToLocalStorage('cart'))
      return;
    }
  };

  return (
    <div className={classes['quantity-block']} style={{backgroundColor: background}}>
      <button className={classes.button} onClick={decrementHandler} disabled={isDisabled}>
        <span className={classes['button-text']}>-</span>
      </button>

      <span className={classes.quantity}>{productInCart?.quantity || 1}</span>
      <button className={classes.button} onClick={incrementHandler}>
        <span className={classes['button-text']}>+</span>
      </button>
    </div>
  );
};

export default QuantityBlock;

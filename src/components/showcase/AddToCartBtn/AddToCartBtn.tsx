import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { setProductToCart } from '../../../store/UserSlice';
import { CartItem } from '../../../types/common';
import QuantityBlock from '../QuantityBlock/QuantityBlock';
import classes from './AddToCartBtn.module.css';

interface IAddToCartBtnProps {
  product: CartItem;
}

const AddToCartBtn: React.FC<IAddToCartBtnProps> = ({ product }) => {
  const [isCLicked, setIsClicked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.user);
  const productInCart = cart.find((cartItem) => cartItem.id === product.id);

  useEffect(() => {
    if (productInCart?.quantity) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [productInCart?.quantity]);

  const addToCartHandler = () => {
    setIsClicked(true);

    dispatch(setProductToCart(product));
  };

  return (
    <div className={classes['add-to-cart-btn']}>
      {isCLicked && (
        <div className={classes['quantity-block-wrapper']}>
          <QuantityBlock id={product.id} />
        </div>
      )}

      {!isCLicked && (
        <button className={classes['main-button']} onClick={addToCartHandler}>
          <span className={classes['main-button-text']}>Добавить в корзину</span>
        </button>
      )}
    </div>
  );
};

export default AddToCartBtn;

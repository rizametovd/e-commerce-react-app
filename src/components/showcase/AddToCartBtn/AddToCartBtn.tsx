import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_ADDED_TO_CART } from '../../../constants/messages';
import { showAlert } from '../../../store/CommonSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { setProductToCart, setToLocalStorage } from '../../../store/UserSlice';
import { AlertType, CartItem } from '../../../types/common';
import QuantityBlock from '../QuantityBlock/QuantityBlock';
import classes from './AddToCartBtn.module.css';

interface IAddToCartBtnProps {
  product: CartItem;
}

const AddToCartBtn: React.FC<IAddToCartBtnProps> = ({ product }) => {
  const [isCLicked, setIsClicked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.user);
  const productInCart = cart.find((cartItem) => cartItem.productId === product.productId);

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
    dispatch(setToLocalStorage('cart'));
    dispatch(showAlert({ type: AlertType.Success, message: PRODUCT_ADDED_TO_CART, action: 'cart' }))
  };

  return (
    <div
      className={classes['add-to-cart-btn']}
      style={{ outline: `1px solid ${isCLicked ? 'lightgray' : 'transparent'}` }}
    >
      {isCLicked && <QuantityBlock id={product.productId} />}

      {!isCLicked && (
        <button className={classes['main-button']} onClick={addToCartHandler}>
          <span className={classes['main-button-text']}>Добавить в корзину</span>
        </button>
      )}
    </div>
  );
};

export default AddToCartBtn;

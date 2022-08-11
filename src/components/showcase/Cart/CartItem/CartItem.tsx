import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../../../../constants/messages';
import IconButton from '../../../UI/IconButton/IconButton';
import FavoriteIcon from '../../../UI/icons/FavoriteIcon/FavoriteIcon';
import TrashIcon from '../../../UI/icons/TrashIcon/TrashIcon';
import QuantityBlock from '../../QuantityBlock/QuantityBlock';
import classes from './CartItem.module.css';

interface CartItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number;
  weight: number;
  totalWeight: number;
  profit?: number;
  discount?: number;
  discountedPrice?: number;
}

const CartItem: React.FC<CartItemProps> = ({ name, image, quantity, id, totalPrice, discount, price }) => {
  const totalPriceWithoutDiscount = price * quantity;
  return (
    <div className={classes['cart-item']}>
      <div className={classes['image-wrapper']}>
        <img src={image} alt={name} className={classes.image} />
      </div>

      <div className={classes['product-name-wrapper']}>
        <span className={classes['product-name']}>{name}</span>

        <div className={classes['action-wrapper']}>
          <IconButton onClick={() => console.log('Delete')}>
            <>
              <TrashIcon />
              <span className={classes['wishlist-text']}>Удалить</span>
            </>
          </IconButton>

          <IconButton onClick={() => console.log('click')}>
            <>
              <FavoriteIcon filled={false} />
              <span className={classes['wishlist-text']}>{true ? REMOVE_FROM_WISHLIST : ADD_TO_WISHLIST}</span>
            </>
          </IconButton>
        </div>
      </div>

      <div className={classes['price-quantity-wrapper']}>
        <div className={classes['price-wrapper']}>
          <span className={`${classes.price} ${discount && classes['discount-price']}`}>{totalPrice} ₽</span>
          {discount && <span className={classes['price-without-discount']}>{totalPriceWithoutDiscount} ₽</span>}
        </div>
        <QuantityBlock id={id} disableDecrement />
      </div>
    </div>
  );
};

export default CartItem;

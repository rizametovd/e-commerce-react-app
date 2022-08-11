import { generatePath, Link } from 'react-router-dom';
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../../../../constants/messages';
import { CartItem as Item } from '../../../../types/common';
import IconButton from '../../../UI/IconButton/IconButton';
import FavoriteIcon from '../../../UI/icons/FavoriteIcon/FavoriteIcon';
import TrashIcon from '../../../UI/icons/TrashIcon/TrashIcon';
import QuantityBlock from '../../QuantityBlock/QuantityBlock';
import classes from './CartItem.module.css';

interface ICartItemProps {
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
  categoryUrl: Item['categoryUrl'];
  isWished: boolean;
  onWishlist: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<ICartItemProps> = ({
  name,
  image,
  quantity,
  id,
  totalPrice,
  discount,
  price,
  categoryUrl,
  isWished,
  onWishlist,
  onRemove,
}) => {
  const totalPriceWithoutDiscount = price * quantity;
  return (
    <div className={classes['cart-item']}>
      <div className={classes['image-wrapper']}>
        <img src={image} alt={name} className={classes.image} />
      </div>

      <div className={classes['product-name-wrapper']}>
        <span>
          <Link to={generatePath('/:categoryUrl/:id', { categoryUrl, id })} className={classes['product-name']}>
            {name}
          </Link>
        </span>

        <div className={classes['action-wrapper']}>
          <IconButton onClick={onRemove}>
            <>
              <TrashIcon />
              <span className={classes['wishlist-text']}>Удалить</span>
            </>
          </IconButton>

          <IconButton onClick={onWishlist}>
            <>
              <FavoriteIcon filled={isWished} />
              <span className={classes['wishlist-text']}>{isWished ? REMOVE_FROM_WISHLIST : ADD_TO_WISHLIST}</span>
            </>
          </IconButton>
        </div>
      </div>

      <div className={classes['price-quantity-wrapper']}>
        <div className={classes['price-wrapper']}>
          <span className={`${classes.price} ${discount && classes['discount-price']}`}>{totalPrice} ₽</span>
          {discount && <span className={classes['price-without-discount']}>{totalPriceWithoutDiscount} ₽</span>}
        </div>

        <QuantityBlock id={id} disableDecrement background={'#f2f2f2'} />
      </div>
    </div>
  );
};

export default CartItem;

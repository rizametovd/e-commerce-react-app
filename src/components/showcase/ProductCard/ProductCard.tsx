import { Product } from '../../../types/common';
import Chip from '../../UI/Chip/Chip';
import IconButton from '../../UI/IconButton/IconButton';
import FavoriteIcon from '../../UI/icons/FavoriteIcon/FavoriteIcon';
import classes from './ProductCard.module.css';

interface IProductCardProps {
  name: Product['name'];
  price: Product['price'];
  image: Product['image'];
  discount?: Product['discount'];
  brand: string;
  category: string;
  onWishlistClick: () => void;
  isAddedToWishlist: boolean;
}

const ProductCard: React.FC<IProductCardProps> = ({
  name,
  price,
  image,
  discount = '',
  brand,
  category,
  isAddedToWishlist,
  onWishlistClick,
}) => {
  const discountAmount = Math.round(+discount);
  const basePrice = Math.round(+price);
  const discountPrice = basePrice - Math.round((basePrice * discountAmount) / 100);

  return (
    <li className={classes['product-card']}>
      <div className={classes['image-wrapper']}>
        <img src={image} alt={name} className={classes.image} />
        <div className={classes['wishlist-btn']}>
          <IconButton onClick={onWishlistClick}>
            <FavoriteIcon filled={isAddedToWishlist} />
          </IconButton>
        </div>
        <div className={classes['discount-chip']}>
          {discount && <Chip text={'-' + discountAmount + '%'} mode={'attention'} />}
        </div>
      </div>

      {discount ? (
        <span className={`${classes.price}`}>
          <span className={classes.price}>{discountPrice} ₽</span>
          <span className={classes['old-price']}>{price} ₽</span>
        </span>
      ) : (
        <span className={classes.price}>{discountPrice} ₽</span>
      )}

      <h6 className={classes.title}>{name}</h6>
      <div className={classes['chips-wrapper']}>
        <Chip text={brand} mode={'highlighted'} />
        <Chip text={category} mode={'highlighted'} />
      </div>
    </li>
  );
};

export default ProductCard;

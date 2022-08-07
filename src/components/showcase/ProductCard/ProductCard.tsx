import Chip from '../../UI/Chip/Chip';
import IconButton from '../../UI/IconButton/IconButton';
import FavoriteIcon from '../../UI/icons/FavoriteIcon/FavoriteIcon';
import classes from './ProductCard.module.css';

interface IProductCardProps {
  name: string;
  price: string;
  image: string;
  discount?: string;
}

const ProductCard: React.FC<IProductCardProps> = ({ name, price, image, discount = '' }) => {
  const discountAmount = Math.round(+discount);
  const basePrice = Math.round(+price);
  const discountPrice = basePrice - Math.round((basePrice * discountAmount) / 100);

  return (
    <li className={classes['product-card']}>
      <div className={classes['image-wrapper']}>
        <img src={image} alt={name} className={classes.image} />
        <div className={classes['wishlist-btn']}>
          <IconButton onClick={() => console.log('Add to wishlist')}>
            <FavoriteIcon />
          </IconButton>
        </div>
        <div className={classes['discount-chip']}>
          {discount && <Chip text={'-' + discountAmount + '%'} mode={'attention'} />}
        </div>
      </div>

      <h6 className={classes.title}>{name}</h6>

      {discount ? (
        <span className={`${classes.price}`}>
          <span className={classes.price}>{discountPrice} ₽</span>
          <span className={classes['old-price']}>{price} ₽</span>
        </span>
      ) : (
        <span className={classes.price}>{discountPrice} ₽</span>
      )}
    </li>
  );
};

export default ProductCard;

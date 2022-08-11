import { generatePath, Link } from 'react-router-dom';
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
  brand: Product['brand'];
  category: Product['category'];
  onWishlistClick: () => void;
  isAddedToWishlist: boolean;
  id: Product['id'];
}

const ProductCard: React.FC<IProductCardProps> = ({
  name,
  price,
  image,
  discount,
  brand,
  category,
  isAddedToWishlist,
  id,
  onWishlistClick,
}) => {
  return (
    <li className={classes['product-card']}>
      <Link to={generatePath('/:url/:id', { url: category.url, id })} className={classes['image-wrapper']}>
        <img src={image} alt={name} className={classes.image} />

        <div className={classes['wishlist-btn']}>
          <IconButton onClick={onWishlistClick}>
            <FavoriteIcon filled={isAddedToWishlist} />
          </IconButton>
        </div>
        <div className={classes['discount-chip']}>
          {discount && <Chip text={'-' + discount.percent + '%'} mode={'attention'} />}
        </div>
      </Link>

      {discount ? (
        <span className={`${classes.price}`}>
          <span className={classes.price}>{discount.discountedPrice} ₽</span>
          <span className={classes['old-price']}>{price} ₽</span>
        </span>
      ) : (
        <span className={classes.price}>{price} ₽</span>
      )}

      <Link to={id} className={classes.title}>
        {name}
      </Link>

      <div className={classes['chips-wrapper']}>
        <Chip text={brand.name} mode={'highlighted'} />
        <Chip text={category.name} mode={'highlighted'} />
      </div>
    </li>
  );
};

export default ProductCard;

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
  weight: Product['weight'];
  category: Product['category'];
  description: Product['description'];
  onWishlistClick: () => void;
  isAddedToWishlist: boolean;
  id: Product['id'];
}

const ProductCard: React.FC<IProductCardProps> = ({
  name,
  price,
  image,
  discount = '',
  brand,
  category,
  isAddedToWishlist,
  id,
  description,
  weight,
  onWishlistClick,
}) => {
  const discountAmount = Math.round(+discount);
  const basePrice = Math.round(+price);
  const discountPrice = basePrice - Math.round((basePrice * discountAmount) / 100);
  const product = {
    name,
    price: basePrice,
    discount: discount ? discountAmount : null,
    discountPrice: discountAmount ? discountPrice : null,
    image,
    brand,
    category,
    isAddedToWishlist,
    weight: +weight,
    id,
    description,
  };

  return (
    <li className={classes['product-card']}>
      <Link
        to={generatePath('/:url/:id', { url: category.url, id })}
        className={classes['image-wrapper']}
        state={product}
      >
        <img src={image} alt={name} className={classes.image} />

        <div className={classes['wishlist-btn']}>
          <IconButton onClick={onWishlistClick}>
            <FavoriteIcon filled={isAddedToWishlist} />
          </IconButton>
        </div>
        <div className={classes['discount-chip']}>
          {discount && <Chip text={'-' + discountAmount + '%'} mode={'attention'} />}
        </div>
      </Link>

      {discount ? (
        <span className={`${classes.price}`}>
          <span className={classes.price}>{discountPrice} ₽</span>
          <span className={classes['old-price']}>{price} ₽</span>
        </span>
      ) : (
        <span className={classes.price}>{price} ₽</span>
      )}

      <Link to={id} className={classes.title} state={product}>
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

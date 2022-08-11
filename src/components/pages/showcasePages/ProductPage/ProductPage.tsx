import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  ADDED_TO_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVED_FROM_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from '../../../../constants/messages';
import { showAlert } from '../../../../store/CommonSlice';
import { AppDispatch, RootState } from '../../../../store/store';
import { handleWishlist, setToLocalStorage } from '../../../../store/UserSlice';
import { AlertType, CartItem, Product } from '../../../../types/common';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';
import AddToCartBtn from '../../../showcase/AddToCartBtn/AddToCartBtn';
import Chip from '../../../UI/Chip/Chip';
import IconButton from '../../../UI/IconButton/IconButton';
import FavoriteIcon from '../../../UI/icons/FavoriteIcon/FavoriteIcon';
import InfoBlock from './InfoBlock/InfoBlock';
import classes from './ProductPage.module.css';

interface IProductPageProps {}

const ProductPage: React.FC<IProductPageProps> = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);
  const { wishlist } = useSelector((state: RootState) => state.user);
  const { id, name, description, image, brand, price, weight, discount } = products.find(
    (product) => product.id === productId
  ) as Product;
  const isAddedToWishlist = wishlist.includes(id);

  const cartItem: CartItem = {
    id,
    quantity: 1,
    price,
    totalPrice: price,
    weight,
    totalWeight: weight,
    discountedPrice: discount?.discountedPrice,
    discount: discount?.percent,
  };

  const wishlistHandler = (id: Product['id']) => {
    dispatch(handleWishlist(id));
    dispatch(setToLocalStorage('likes'));

    if (isAddedToWishlist) {
      dispatch(showAlert({ type: AlertType.Info, message: REMOVED_FROM_WISHLIST }));
    } else {
      dispatch(showAlert({ type: AlertType.Success, message: ADDED_TO_WISHLIST, isAction: true }));
    }
  };

  return (
    <Section>
      <>
        <SectionBody>
          <div className={classes['product-page']}>
            <div className={classes['image-wrapper']}>
              <img src={image} alt={name} className={classes.image} />
            </div>
            <div className={classes['content-wrapper']}>
              <div className={classes['title-wrapper']}>
                <h1 className={classes.title}>{name}</h1>
                <Chip text={brand.name} mode={'plain'} />
              </div>

              <div className={classes['price-wrapper']}>
                {discount ? (
                  <span className={`${classes.price}`}>
                    <span className={classes.price}>{discount.discountedPrice} ₽</span>
                    <span className={classes['old-price']}>{price} ₽</span>
                    <Chip text={'-' + discount.percent + '%'} mode={'attention'} />
                  </span>
                ) : (
                  <span className={classes.price}>{price} ₽</span>
                )}

                <IconButton onClick={() => wishlistHandler(id)} column>
                  <>
                    <FavoriteIcon filled={isAddedToWishlist} />
                    <span className={classes['wishlist-text']}>
                      {isAddedToWishlist ? REMOVE_FROM_WISHLIST : ADD_TO_WISHLIST}
                    </span>
                  </>
                </IconButton>
              </div>

              <div className={classes.actions}>
                <AddToCartBtn product={cartItem} />
              </div>

              {description && (
                <div className={classes.description}>
                  <p className={classes.subtitle}>О товаре</p>
                  <p className={classes.text}>{description}</p>
                </div>
              )}

              <InfoBlock />
            </div>
          </div>
        </SectionBody>
      </>
    </Section>
  );
};

export default ProductPage;

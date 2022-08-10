import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { showAlert } from '../../../../store/CommonSlice';
import { AppDispatch, RootState } from '../../../../store/store';
import { handleWishlist, setToLocalStorage } from '../../../../store/UserSlice';
import { AlertType, Product } from '../../../../types/common';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';
import AddToCartBtn from '../../../showcase/AddToCartBtn/AddToCartBtn';
import Chip from '../../../UI/Chip/Chip';
import IconButton from '../../../UI/IconButton/IconButton';
import FavoriteIcon from '../../../UI/icons/FavoriteIcon/FavoriteIcon';
import Loader from '../../../UI/Loader/Loader';
import classes from './ProductPage.module.css';

type ProductData = {
  name: string;
  price: number;
  description: string;
  discountPrice: number;
  image: string;
  discount: number;
  brand: Product['brand'];
  category: {
    name: string;
    id: string;
  };
  isAddedToWishlist: boolean;
  weight: number;
  id: string;
};

interface IProductPageProps {}

const ProductPage: React.FC<IProductPageProps> = () => {
  // const params = useParams()
  // console.log('params:', params)
const { isLoading } = useSelector((state: RootState) => state.product);





  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  
  const { id, name, description, image, brand, price, weight, discountPrice, discount, isAddedToWishlist } =
    location.state as ProductData;

  const cartItem = {
    id,
    quantity: 1,
    price,
    totalPrice: price,
    weight,
    totalWeight: weight,
    discountPrice,
    discount,
  };

  const wishlistHandler = (id: Product['id']) => {
    dispatch(handleWishlist(id));
    dispatch(setToLocalStorage('likes'));

    if (isAddedToWishlist) {
      dispatch(showAlert({ type: AlertType.Info, message: 'Удалено из избранного' }));
    } else {
      dispatch(showAlert({ type: AlertType.Success, message: 'Добавлено в избранное', isAction: true }));
    }
  };


  return (
    <Section>
      <>
        {isLoading && <Loader />}

        {!isLoading && (
          <SectionBody>
            <div className={classes['product-page']}>
              <div className={classes['image-wrapper']}>
                <img src={image} alt={name} className={classes.image} />
              </div>
              <div className={classes['content-wrapper']}>
                <h1 className={classes.title}>{name}</h1>
                <div className={classes.brand}>
                  <p className={classes.subtitle}>Производитель:</p>
                  <p className={classes.text}>{brand.name}</p>
                </div>

                <div className={classes['price-wrapper']}>
                  {discount ? (
                    <span className={`${classes.price}`}>
                      <span className={classes.price}>{discountPrice} ₽</span>
                      <span className={classes['old-price']}>{price} ₽</span>
                      <Chip text={'-' + discount + '%'} mode={'attention'} />
                    </span>
                  ) : (
                    <span className={classes.price}>{price} ₽</span>
                  )}

              
                    <IconButton onClick={() => wishlistHandler(id)} column>
                      <>
                        <FavoriteIcon />
                        {isAddedToWishlist ? 'Удалить из избранного' : 'Добавить в избранное'}
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
              </div>
            </div>
          </SectionBody>
        )}
      </>
    </Section>
  );
};

export default ProductPage;

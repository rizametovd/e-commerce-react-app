import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NO_PRODUCTS_IN_CART } from '../../../../constants/messages';
import { PATHS } from '../../../../constants/routes';
import useForm from '../../../../hooks/useForm';
import { createOrder } from '../../../../store/CommonSlice';
import { AppDispatch, RootState } from '../../../../store/store';
import { clearCart, removeProductFromCart, setToLocalStorage, wishListHandler } from '../../../../store/UserSlice';
import { CartItem, Product, ProductCartItem } from '../../../../types/common';
import { cartFormValidator } from '../../../../utils/validators';
import Section from '../../../layouts/showcaseLayouts/Section/Section';
import SectionBody from '../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody';
import SectionHeader from '../../../layouts/showcaseLayouts/Section/SectionHeader/SectionHeader';
import Cart from '../../../showcase/Cart/Cart';
import CartForm from '../../../showcase/CartForm/CartForm';
import Placeholder from '../../../UI/Placeholder/Placeholder';
import classes from './CartPage.module.css';

const INIT_INPUT = {
  name: '',
  phone: '',
  address: '',
};

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.user);
  const { wishlist } = useSelector((state: RootState) => state.user);
  const { products } = useSelector((state: RootState) => state.product);
  const { error, isLoading } = useSelector((state: RootState) => state.common);
  const { input, handleChange, errors, submit } = useForm(INIT_INPUT, handleSubmit, cartFormValidator);

  const cartProducts: ProductCartItem[] = cart.map((cartItem) => {
    const product = products.find((product) => product.id === cartItem.productId) as Product;
    const isWished = wishlist.includes(cartItem.productId);

    return {
      ...cartItem,
      name: product.name,
      image: product.image,
      categoryUrl: product.category.url,
      isWished,
    };
  });

  const price = cart.reduce((res, val) => res + val.totalPrice, 0);
  const weight = +cart.reduce((res, val) => res + val.totalWeight, 0).toFixed(2);
  const profit = cart.reduce((res, { profit = 0 }) => res + profit, 0);
  const quantity = cart.reduce((res, { quantity }) => res + quantity, 0);
  const hasProducts = cart.length > 0;
  const summaryProps = {
    price,
    weight,
    profit,
    quantity,
  };

  const handleWishlist = ({ id, isWished }: { id: CartItem['productId']; isWished: boolean }) => {
    dispatch(wishListHandler({ id, isWished }));
  };

  const handleRemoveCartItem = (id: CartItem['productId']) => {
    dispatch(removeProductFromCart(id));
    dispatch(setToLocalStorage('cart'));
  };

  async function handleSubmit() {
    const order = {
      user: input,
      cart: cart,
      timestamp: Date.now(),
      totalPrice: price,
      totalWeight: weight,
      totalDiscount: profit,
      totalQuantity: quantity,
    };

    await dispatch(createOrder(order));

    if (!error.isError && !isLoading) {
      navigate(`${PATHS.cart}/${PATHS.success}`);
      dispatch(clearCart());
      dispatch(setToLocalStorage('cart'));
    }
  }

  return (
    <Section>
      <>
        <SectionHeader title={'Корзина'} />

        <SectionBody>
          <>
            {!hasProducts && <Placeholder text={NO_PRODUCTS_IN_CART} />}

            {hasProducts && (
              <div className={classes['cart-page-body']}>
                <Cart cart={cartProducts} onRemove={handleRemoveCartItem} onWish={handleWishlist} {...summaryProps} />

                <span className={classes.title}>Ваши данные</span>
                <CartForm
                  onSubmit={submit}
                  value={input}
                  errors={errors}
                  onChange={handleChange}
                  isLoading={isLoading}
                />
              </div>
            )}
          </>
        </SectionBody>
      </>
    </Section>
  );
};

export default CartPage;

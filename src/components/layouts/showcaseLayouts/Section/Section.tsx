import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GO_TO_CART, GO_TO_WISHLIST } from '../../../../constants/messages';
import { PATHS } from '../../../../constants/routes';
import { hideAlert } from '../../../../store/CommonSlice';
import { AppDispatch, RootState } from '../../../../store/store';
import Toast from '../../../UI/Toast/Toast';
import classes from './Section.module.css';

interface ISectionProps {
  children: JSX.Element;
}

const Section: React.FC<ISectionProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { alert } = useSelector((state: RootState) => state.common);
  const actionName = alert.action ? (alert.action === 'wishlist' ? GO_TO_WISHLIST : GO_TO_CART) : '';

  const toastHandler = () => {
    if (alert.action === 'wishlist') {
      navigate(PATHS.wishlist);
    }

    if (alert.action === 'cart') {
      navigate(PATHS.cart);
    }

    dispatch(hideAlert());
  };

  return (
    <section className={classes.section}>
      <Toast message={alert.message} type={alert.type} onAction={toastHandler} actionName={actionName} />
      {children}
    </section>
  );
};

export default Section;

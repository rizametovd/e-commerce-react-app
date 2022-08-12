import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { GO_TO_WISHLIST } from '../../../../constants/messages';
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

  const toastHandler = () => {
    navigate(PATHS.wishlist);
    dispatch(hideAlert());
  };

  return (
    <section className={classes.section}>
      <Toast
        message={alert.message}
        type={alert.type}
        onAction={toastHandler}
        actionName={(alert.isAction && GO_TO_WISHLIST) || ''}
      />
      {children}
    </section>
  );
};

export default Section;

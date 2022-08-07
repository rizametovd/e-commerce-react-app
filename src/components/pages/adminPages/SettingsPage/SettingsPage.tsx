import classes from './SettingsPage.module.css';
import Categories from '../../../admin/Categories/Categories';
import Content from '../../../layouts/adminLayouts/Content/Content';
import Actions from '../../../layouts/adminLayouts/Actions/Actions';
import Brands from '../../../admin/Brands/Brands';
import Toast from '../../../UI/Toast/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { hideAlert } from '../../../../store/CommonSlice';
import { AlertType } from '../../../../types/common';
import { resetCategoryError } from '../../../../store/CategorySlice';
import { resetBrandError } from '../../../../store/BrandSlice';

const SettingsPage: React.FC = () => {
  const { common, category, brand } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const handleToast = () => {
    dispatch(hideAlert());
  };

  const handleCategoryErrorToast = () => {
    dispatch(resetCategoryError());
  };

  const handleBrandErrorToast = () => {
    dispatch(resetBrandError());
  };

  return (
    <>
      <Actions title={'Настройки'} />

      <Content>
        <div className={classes.settings}>
          <Toast message={common.alert.message} type={common.alert.type} onClose={handleToast} />
          <Toast message={category.error.message} type={AlertType.Error} onClose={handleCategoryErrorToast} />
          <Toast message={brand.error.message} type={AlertType.Error} onClose={handleBrandErrorToast} />
          <Categories />
          <Brands />
        </div>
      </Content>
    </>
  );
};

export default SettingsPage;

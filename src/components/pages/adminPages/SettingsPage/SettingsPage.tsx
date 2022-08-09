import classes from './SettingsPage.module.css';
import Categories from '../../../admin/Categories/Categories';
import Content from '../../../layouts/adminLayouts/Content/Content';
import Actions from '../../../layouts/adminLayouts/Actions/Actions';
import Brands from '../../../admin/Brands/Brands';
import Toast from '../../../UI/Toast/Toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

const SettingsPage: React.FC = () => {
  const { alert } = useSelector((state: RootState) => state.common);

  return (
    <>
      <Actions title={'Настройки'} />

      <Content>
        <div className={classes.settings}>
          <Toast message={alert.message} type={alert.type} />
          <Categories />
          <Brands />
        </div>
      </Content>
    </>
  );
};

export default SettingsPage;

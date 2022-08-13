import classes from './SettingsPage.module.css';
import Categories from '../../../admin/Categories/Categories';
import Content from '../../../layouts/adminLayouts/Content/Content';
import Actions from '../../../layouts/adminLayouts/Actions/Actions';
import Brands from '../../../admin/Brands/Brands';

const SettingsPage: React.FC = () => {

  return (
    <>
      <Actions title={'Настройки'} />

      <Content>
        <div className={classes.settings}>
          <Categories />
          <Brands />
        </div>
      </Content>
    </>
  );
};

export default SettingsPage;

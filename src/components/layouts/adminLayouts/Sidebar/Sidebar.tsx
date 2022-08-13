import classes from './Sidebar.module.css';
import SideBarItem from './SidebarItem/SidebarItem';
import { useState } from 'react';
import MenuIcon from '../../../UI/icons/MenuIcon/MenuIcon';
import ArrowLeftIcon from '../../../UI/icons/ArrowLeftIcon/ArrowLeftIcon';
// import OrderIcon from '../../UI/icons/OrderIcon/OrderIcon';
import ProductIcon from '../../../UI/icons/ProductIcon/ProductIcon';
import CategoryIcon from '../../../UI/icons/CategoryIcon/CategoryIcon';
import { PATHS } from '../../../../constants/routes';
import OrderIcon from '../../../UI/icons/OrderIcon/OrderIcon';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={`${classes.sidebar} ${isOpen && classes.open}`}>
      <button className={`${classes['toggle-btn']} ${isOpen && classes.opened}`} onClick={sidebarHandler}>
        {isOpen ? <ArrowLeftIcon /> : <MenuIcon />}
      </button>

      <nav className={classes.navigation}>
        <ul className={`${isOpen && classes['list-opened']} ${classes.list}`}>
          <SideBarItem isOpen={isOpen} title={'Заказы'} icon={<OrderIcon />} link={PATHS.orders} />
          <SideBarItem isOpen={isOpen} title={'Товары'} icon={<ProductIcon />} link={PATHS.products} />
          <SideBarItem isOpen={isOpen} title={'Настройки'} icon={<CategoryIcon />} link={PATHS.settings} />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

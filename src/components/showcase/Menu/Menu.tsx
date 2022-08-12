import { useState } from 'react';
import { Link } from 'react-router-dom';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { Category } from '../../../types/common';
import MenuIcon from '../../UI/icons/MenuIcon/MenuIcon';
import classes from './Menu.module.css';

interface IMenuProps {
  categories: Category[];
}

const Menu: React.FC<IMenuProps> = ({ categories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const ref = useOutsideClick<HTMLDivElement>(closeMenu);

  const openMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div className={classes.menu} ref={ref}>
      <button onClick={openMenu} className={classes.button}>
        <MenuIcon fill={'black'} />
        Каталог товаров
      </button>
      {isMenuOpen && (
        <nav className={classes.nav}>
          <ul className={classes['menu-list']}>
            {categories.map((category) => (
              <li key={category.id} className={classes['menu-list-item']}>
                <Link to={category.url} onClick={closeMenu} className={classes.link}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Menu;

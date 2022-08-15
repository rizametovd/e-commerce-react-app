import { generatePath, NavLink } from 'react-router-dom';
import { Category } from '../../../types/common';
import classes from './CategoriesList.module.css';

interface ICategoriesListProps {
  categories: Category[];
}

const CategoriesList: React.FC<ICategoriesListProps> = ({ categories }) => {
  return (
    <nav className={classes.nav}>
      <span className={classes.title}>Категории</span>
      <ul className={classes.list}>
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={generatePath('/:url', { url: category.url })}
            className={({ isActive }) =>
              [classes.link, isActive ? classes.active : undefined].filter(Boolean).join(' ')
            }
          >
            <li>{category.name}</li>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default CategoriesList;

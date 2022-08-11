import classes from './SettingsList.module.css';
import IconButton from '../../UI/IconButton/IconButton';
import EditIcon from '../../UI/icons/EditIcon/EditIcon';
import TrashIcon from '../../UI/icons/TrashIcon/TrashIcon';
import Chip from '../../UI/Chip/Chip';

interface ISettingsListProps {
  items: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SettingsList: React.FC<ISettingsListProps> = ({ items, onEdit, onDelete }) => {
  return (
    <ul className={classes.list}>
      {items.map(({ id, name, productsCount, discountedProductsCount }) => (
        <li className={classes['list-container']} key={id}>
          <div className={classes['product-list-item']}>
            {name}
            <div className={classes.action}>
              <IconButton onClick={() => onEdit(id)}>
                <EditIcon />
              </IconButton>

              <IconButton onClick={() => onDelete(id)}>
                <TrashIcon fill={'lightgray'} />
              </IconButton>
            </div>
          </div>

          <div className={classes['chip-wrapper']}>
            <Chip text={`Товаров: ${productsCount}`} />
            {discountedProductsCount > 0 && <Chip text={`Со скидкой: ${discountedProductsCount}`} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SettingsList;

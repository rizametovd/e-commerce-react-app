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
      {items.map(({ id, name, productsCount }) => (
        <li className={classes['list-container']} key={id}>
          <div className={classes['product-list-item']}>
            {name}
            <div className={classes.action}>
              <IconButton onClick={() => onEdit(id)}>
                <EditIcon />
              </IconButton>

              <IconButton onClick={() => onDelete(id)}>
                <TrashIcon />
              </IconButton>
            </div>
          </div>

          <Chip text={`Товаров: ${productsCount}`} />
        </li>
      ))}
    </ul>
  );
};

export default SettingsList;

import IconButton from '../IconButton/IconButton';
import classes from './Badge.module.css';

interface IBadgeProps {
  icon: JSX.Element;
  onClick: () => void;
  count: number;
  title?: string;
}

const Badge: React.FC<IBadgeProps> = ({ icon, onClick, count, title='' }) => {
  return (
    <IconButton onClick={onClick}>
      <div className={classes.badge}>
        <div className={classes.wrapper}>
          <div className={classes.count}>{count}</div>
          {icon}
        </div>
        {title && <span className={classes.text}>{title}</span>}
      </div>
    </IconButton>
  );
};

export default Badge;

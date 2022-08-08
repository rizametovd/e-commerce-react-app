import { Link } from 'react-router-dom';
import classes from './Badge.module.css';

interface IBadgeProps {
  icon: JSX.Element;
  count: number;
  title?: string;
  to: string;
}

const Badge: React.FC<IBadgeProps> = ({ icon, to, count, title='' }) => {
  return (
    <Link to={to} className={classes.link}>
      <div className={classes.badge}>
        <div className={classes.wrapper}>
          {count > 0 && <div className={classes.count}>{count}</div>}
          {icon}
        </div>
        {title && <span className={classes.text}>{title}</span>}
      </div>
    </Link>
  );
};

export default Badge;

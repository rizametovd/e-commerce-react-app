import { Link } from 'react-router-dom';
import classes from './BaseLink.module.css';

interface IBaseLinkProps {
  children: string;
  to: string;
  button?: boolean;
  size: 's' | 'm';
}
const BaseLink: React.FC<IBaseLinkProps> = ({ children, to, button, size = 'm' }) => {
  return (
    <Link to={to} className={`${classes.link} ${button && classes.button} ${classes[size]}`}>
      {children}
    </Link>
  );
};

export default BaseLink;

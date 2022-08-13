import Spinner from '../Spinner/Spinner';
import classes from './Button.module.css';

interface IButtonProps {
  children?: string;
  mode: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean
}

const Button: React.FC<IButtonProps> = ({ type = 'button', children, onClick, mode, isDisabled = false, isLoading }) => {
  return (
    <button disabled={isDisabled || isLoading} className={`${classes.button} ${classes[mode]}`} onClick={onClick} type={type}>
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;

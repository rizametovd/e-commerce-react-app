import classes from './Button.module.css';

interface IButtonProps {
  children?: string;
  mode: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({ type = 'button', children, onClick, mode, isDisabled = false }) => {
  return (
    <button disabled={isDisabled} className={`${classes.button} ${classes[mode]}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;

import classes from './IconButton.module.css';

interface IIconButtonProps {
  children: JSX.Element;
  onClick: () => void;
  isDisabled?: boolean;
  column?: boolean;
  type?: 'button' | 'submit';
}

const IconButton: React.FC<IIconButtonProps> = ({ children, onClick, isDisabled, type = 'button', column}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button onClick={handleClick} className={`${classes.button} ${column ? classes.column : ''}`} disabled={isDisabled} type={type}>
      {children}
    </button>
  );
};

export default IconButton;

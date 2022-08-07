import classes from './IconButton.module.css';

interface IIconButtonProps {
  children: JSX.Element;
  onClick: () => void;
  isDisabled?: boolean;
  type?: 'button' | 'submit';
}

const IconButton: React.FC<IIconButtonProps> = ({ children, onClick, isDisabled, type = 'button' }) => {
  return (
    <button onClick={onClick} className={classes.button} disabled={isDisabled} type={type}>
      {children}
    </button>
  );
};

export default IconButton;

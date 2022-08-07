import IconButton from '../IconButton/IconButton';
import CloseIcon from '../icons/CloseIcon/CloseIcon';
import classes from './Toast.module.css';

interface IToastProps {
  message: string;
  type: string,
  onClose: () => void;
}

const Toast: React.FC<IToastProps> = ({ message, onClose, type }) => {
  return (
    <>
      {message && (
        <div className={`${classes.toast} ${classes[type]}`}>
          <span>{message}</span>
          <div className={classes.button}>
<IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>

          </div>
          
        </div>
      )}
    </>
  );
};

export default Toast;

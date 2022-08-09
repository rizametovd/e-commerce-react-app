import classes from './Toast.module.css';

interface IToastProps {
  message: string;
  type: string;
  onAction?: () => void;
  actionName?: string;
}

const Toast: React.FC<IToastProps> = ({ message, onAction = () => {}, type, actionName }) => {
  return (
    <>
      {message && (
        <div className={`${classes.toast} ${classes[type]}`}>
          <span>{message}</span>
          {actionName && (
            <span className={classes.action} onClick={onAction}>
              {actionName}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Toast;

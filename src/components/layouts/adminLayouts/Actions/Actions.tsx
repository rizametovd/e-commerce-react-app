import Button from '../../../UI/Button/Button';
import classes from './Actions.module.css';

interface IActionsProps {
  title: string;
  actionBtnText?: string;
  onAction?: () => void;
  isOpen?: boolean;
  isDisabled?: boolean;
}

const Actions: React.FC<IActionsProps> = ({ title, onAction, actionBtnText, isOpen, isDisabled = false }) => {
  return (
    <section className={classes.actions}>
      <h1 className={classes.title}>{title}</h1>
      {actionBtnText && (
        <Button isDisabled={isOpen || isDisabled} mode={'primary'} onClick={onAction}>
          {actionBtnText}
        </Button>
      )}
    </section>
  );
};

export default Actions;

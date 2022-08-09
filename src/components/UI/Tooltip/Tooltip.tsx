import classes from './Tooltip.module.css';
import { useState } from 'react';

interface ITooltipProps {
  icon: JSX.Element;
  message: string;
}

const Tooltip: React.FC<ITooltipProps> = ({ icon, message }) => {
  const [isActive, setIsActive] = useState(false);

  const show = () => {
    setIsActive(true);
  };

  const hide = () => {
    setIsActive(false);
  };

  return (
    <div className={classes.tooltip} onMouseEnter={show} onMouseLeave={hide}>
      {icon}
      {isActive && <span className={`${classes['tooltip-message']} ${classes['left']}`}>{message}</span>}
    </div>
  );
};

export default Tooltip;

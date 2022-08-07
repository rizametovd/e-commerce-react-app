import classes from './CloseIcon.module.css';

interface ICloseIconProps {
  width?: number;
  height?: number;
}
const CloseIcon: React.FC<ICloseIconProps> = ({ width = 20, height = 20 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={width} width={height} viewBox="0 0 48 48" className={classes.icon}>
      <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
    </svg>
  );
};

export default CloseIcon;

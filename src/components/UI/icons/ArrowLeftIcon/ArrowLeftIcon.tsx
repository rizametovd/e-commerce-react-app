import classes from './ArrowLeftIcon.module.css';

interface IArrowLeftIconProps {
  width?: number;
  height?: number;
}
const ArrowLeftIcon: React.FC<IArrowLeftIconProps> = ({ width = 24, height = 24 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={width} width={height} viewBox="0 0 48 48" className={classes.icon}>
      <path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z" />
    </svg>
  );
};

export default ArrowLeftIcon;

import classes from './MenuIcon.module.css';

interface IMenuIconProps {
  width?: number;
  height?: number;
  fill?: string;
}
const MenuIcon: React.FC<IMenuIconProps> = ({ width = 24, height = 24, fill="#fff" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={width} width={height} viewBox="0 0 48 48" className={classes.icon} fill={fill}>
      <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
    </svg>
  );
};

export default MenuIcon;

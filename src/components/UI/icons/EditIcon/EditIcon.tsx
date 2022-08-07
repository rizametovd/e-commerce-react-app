import classes from './EditIcon.module.css';

interface IEditIconProps {
  width?: number;
  height?: number;
}
const EditIcon: React.FC<IEditIconProps> = ({ width = 22, height = 22 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={width} width={height} viewBox="0 0 48 48" className={classes.icon}>
      <path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z" />
    </svg>
  );
};

export default EditIcon;

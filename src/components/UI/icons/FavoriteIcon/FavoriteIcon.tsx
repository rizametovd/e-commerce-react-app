import classes from './FavoriteIcon.module.css';

interface IFavoriteIconProps {
  width?: number;
  height?: number;
  filled?: boolean;
  fill?: string;
}
const FavoriteIcon: React.FC<IFavoriteIconProps> = ({ width = 20, height = 20, filled = false, fill = '#222222' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={width}
      width={height}
      viewBox="0 0 48 48"
      className={classes.icon}
      fill={filled ? '#f44336' : fill}
    >
      {filled ? (
        <path d="m24 41.95-2.05-1.85q-5.3-4.85-8.75-8.375-3.45-3.525-5.5-6.3T4.825 20.4Q4 18.15 4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.85 0 5.275 1.35Q22.2 8 24 10.55q2.1-2.7 4.45-3.975T33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 2.3-.825 4.55T40.3 25.425q-2.05 2.775-5.5 6.3T26.05 40.1Z" />
      ) : (
        <path d="m24 42.35-2.25-2q-5.35-4.9-8.825-8.45Q9.45 28.35 7.4 25.55q-2.05-2.8-2.875-5.075Q3.7 18.2 3.7 15.85q0-4.65 3.1-7.75Q9.9 5 14.5 5q2.85 0 5.25 1.3T24 10.1q2.1-2.65 4.45-3.875T33.5 5q4.6 0 7.7 3.1 3.1 3.1 3.1 7.75 0 2.35-.825 4.625T40.6 25.55q-2.05 2.8-5.525 6.35-3.475 3.55-8.825 8.45Zm0-4.5q5.05-4.65 8.3-7.95 3.25-3.3 5.175-5.775Q39.4 21.65 40.15 19.7q.75-1.95.75-3.85 0-3.25-2.075-5.35Q36.75 8.4 33.5 8.4q-2.55 0-4.725 1.575T25.25 14.4H22.7q-1.3-2.8-3.5-4.4-2.2-1.6-4.7-1.6-3.25 0-5.325 2.1T7.1 15.85q0 1.95.775 3.9t2.675 4.475q1.9 2.525 5.175 5.8T24 37.85Zm0-14.7Z" />
      )}
    </svg>
  );
};

export default FavoriteIcon;

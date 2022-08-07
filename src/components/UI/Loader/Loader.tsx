import classes from './Loader.module.css';

export const Loader: React.FC = () => {
  return (
    <div className={classes['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;

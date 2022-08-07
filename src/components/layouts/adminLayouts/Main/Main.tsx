import classes from './Main.module.css';

interface IMainProps {
  children: JSX.Element;
}

const Main: React.FC<IMainProps> = ({ children }) => {
  return <main className={classes.main}>{children}</main>;
};

export default Main;

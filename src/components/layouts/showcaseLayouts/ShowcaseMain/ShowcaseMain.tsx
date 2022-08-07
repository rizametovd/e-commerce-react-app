import classes from './ShowcaseMain.module.css';

interface IShowcaseMainProps {
  children: JSX.Element;
}

const ShowcaseMain: React.FC<IShowcaseMainProps> = ({ children }) => {
  return <main className={classes.main}>{children}</main>;
};

export default ShowcaseMain;

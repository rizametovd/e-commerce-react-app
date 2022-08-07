import classes from './Content.module.css';

interface IContentProps {
  children: JSX.Element;
}

const Content: React.FC<IContentProps> = ({ children }) => {
  return <section className={classes.content}>{children}</section>;
};

export default Content;

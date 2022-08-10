import classes from './Section.module.css';

interface ISectionProps {
  children: JSX.Element;
}

const Section: React.FC<ISectionProps> = ({ children }) => {
  return <section className={classes.section}>{children}</section>;
};

export default Section;

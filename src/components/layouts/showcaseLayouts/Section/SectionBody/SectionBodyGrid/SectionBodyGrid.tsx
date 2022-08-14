import classes from './SectionBodyGrid.module.css';
interface ISectionBodyGridProps {
  children: JSX.Element;
}

const SectionBodyGrid: React.FC<ISectionBodyGridProps> = ({ children }) => {
  return <div className={classes.grid}>{children}</div>;
};

export default SectionBodyGrid;

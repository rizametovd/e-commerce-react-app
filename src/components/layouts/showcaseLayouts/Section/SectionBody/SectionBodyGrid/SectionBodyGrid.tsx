import classes from './SectionBodyGrid.module.css';
interface ISectionBodyGridProps {
  children: JSX.Element;
  displayBlock?: boolean;
}

const SectionBodyGrid: React.FC<ISectionBodyGridProps> = ({ children, displayBlock = false }) => {
  return <div className={displayBlock ? classes.block : classes.grid}>{children}</div>;
};

export default SectionBodyGrid;

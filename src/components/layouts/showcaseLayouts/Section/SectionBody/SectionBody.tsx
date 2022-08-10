import classes from './SectionBody.module.css';

interface ISectionBodyProps {
  children: JSX.Element;
}
const SectionBody: React.FC<ISectionBodyProps> = ({ children }) => {
  return <div className={classes['section-body']}>{children}</div>;
};

export default SectionBody;

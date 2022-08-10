import classes from './SectionHeader.module.css';

interface ISectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader: React.FC<ISectionHeaderProps> = ({ title, description }) => {
  return (
    <div className={classes['section-header']}>
      <h1 className={classes['section-header-title']}>{title}</h1>
      {description && <p className={classes['section-header-description']}>{description}</p>}
    </div>
  );
};

export default SectionHeader;

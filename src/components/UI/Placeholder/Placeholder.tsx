import classes from './Placeholder.module.css';

interface IPlaceholderProps {
  text: string;
  size?: string;
}

const Placeholder: React.FC<IPlaceholderProps> = ({ text, size = '36px' }) => {
  return (
    <h3 className={classes.heading} style={{ fontSize: size }}>
      {text}
    </h3>
  );
};

export default Placeholder;

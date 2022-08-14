import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Checkbox.module.css';

interface ICheckboxProps {
  onCheck: () => void;
  label: string;
}

const Checkbox: React.FC<ICheckboxProps> = ({ onCheck, label }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { url } = useParams();

  useEffect(() => {
    if (url) {
      setIsChecked(false);
    }
  }, [url]);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
    onCheck();
  };

  return (
    <label className={classes.container}>
      <input type={'checkbox'} onChange={handleChange} checked={isChecked} />
     {label}
      <span className={classes.checkmark}></span>
    </label>
  );
};

export default Checkbox;

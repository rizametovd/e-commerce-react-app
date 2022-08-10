import { useState } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { Option } from '../../../types/common';
import classes from './Select.module.css';

interface ISelectProps {
  options: Option[];
  defaultOptionText: string;
  isDisabled?: boolean;
  label: string;
  required?: boolean;
  onSelect: (option: { [key: string]: string }) => void;
  value: string;
  field: string;
  errorText?: string;
}

const Select: React.FC<ISelectProps> = ({
  options,
  defaultOptionText,
  isDisabled,
  onSelect,
  required,
  label,
  value,
  field,
  errorText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isDisabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick<HTMLDivElement>(handleClickOutside);

  return (
    <div className={`${classes.select} ${errorText && classes.error} ${isDisabled && classes.disabled}`} onClick={handleOpen} ref={ref} tabIndex={0}>
      <span className={classes['default-value']}>{value ? value : defaultOptionText}</span>

      {isOpen && (
        <ul className={classes.options}>
          <li className={classes.option} onClick={() => onSelect({ field })}>
            {defaultOptionText}
          </li>
          {options.map(({ id, name, url }) => (
            <li
              key={id}
              className={`${classes.option} ${value === name && classes.active}`}
              onClick={() => onSelect({ name, id, field, url })}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;

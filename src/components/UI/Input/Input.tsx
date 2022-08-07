import classes from './Input.module.css';

interface IInputProps {
  label: string;
  errorText?: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
  isDisabled?: boolean
}

const Input: React.FC<IInputProps> = ({
  label,
  errorText,
  name,
  type,
  required = false,
  placeholder,
  onChange,
  value,
  isDisabled
}) => {
  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor={name}>
        {label} {required && <span className={classes.highlighted}>*</span>}
      </label>
      <input
        className={`${classes.input} ${errorText && classes.error}`}
        name={name}
        type={type}
        id={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
      {errorText && <span className={classes.highlighted}>{errorText}</span>}
    </div>
  );
};

export default Input;

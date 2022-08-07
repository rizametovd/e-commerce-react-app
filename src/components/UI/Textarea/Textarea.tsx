import classes from './Textarea.module.css';

interface ITextareaProps {
  label: string;
  errorText?: string;
  name: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<ITextareaProps> = ({
  label,
  errorText,
  name,
  required = false,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor={name}>
        {label} {required && <span className={classes.highlighted}>*</span>}
      </label>
      <textarea
        className={`${classes.textarea} ${errorText && classes.error}`}
        id={name}
        rows={6}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {errorText && <span className={classes.highlighted}>{errorText}</span>}
    </div>
  );
};

export default Textarea;

import { useState } from 'react';

type Error = {
  [key: string]: string | undefined;
};

type Option = {
  [key: string]: string;
};

const useForm = <T extends {}>(
  initInput: T,
  callback: () => void,
  validator: (field: string, inputValue: string | { [key: string]: string }) => { [key: string]: string } | null
): {
  input: T;
  errors: Error;
  setInput: React.Dispatch<React.SetStateAction<T>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  resetForm: () => void;
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChangeSelect: (option: Option) => void;
} => {
  const [input, setInput] = useState(initInput);
  const [errors, setErrors] = useState<Error>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    clearValidation(name);

    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeSelect = (option: Option) => {
    const { name, id, field, url } = option;

    clearValidation(field);

    setInput((prevState) => ({
      ...prevState,
      [field]: {
        name,
        id,
        url
      },
    }));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = validate();

    if (!isFormValid) return;

    callback();
    resetForm();
  };

  const validate = () => {
    let isValid = true;

    Object.entries(input).forEach(([key, value]) => {
      const inputErrorObj = validator(key, value as string | { [key: string]: string });
      if (inputErrorObj) {
        isValid = false;
        setErrors((prev) => ({ ...prev, ...inputErrorObj }));
      }
    });

    return isValid;
  };

  const clearValidation = (field: keyof Error) => {
    if (field) {
      setErrors((prevState) => ({
        ...prevState,
        [field]: undefined,
      }));
      return;
    }
    setErrors({});
  };

  const resetForm = () => {
    setInput(initInput);
    setErrors({});
  };

  return { input, errors, setInput, handleChange, resetForm, submit, handleChangeSelect };
};

export default useForm;

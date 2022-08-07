import { useState } from 'react';

type Error = {
  [key: string]: string | undefined;
};

type ValidateFields = string[];

type Option = {
  [key: string]: string;
};

const useForm = <T extends {}>(
  initInput: T,
  validateFields: ValidateFields,
  callback: () => void
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
    const { name, id, field } = option;

    clearValidation(field);

    setInput((prevState) => ({
      ...prevState,
      [field]: {
        name,
        id,
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

  const validator = (field: string, inputValue: string | { [key: string]: string }) => {
    let value = '';

    if (!validateFields.includes(field)) {
      return;
    }

    if (typeof inputValue === 'string') {
      value = inputValue.trim();
    }

    if (typeof inputValue === 'object') {
      if (inputValue.id) {
        value = inputValue.id.trim();
      } else {
        value = '';
      }
    }

    if (value.length === 0) {
      return {
        [field]: 'Поле не может быть пустым',
      };
    }

    if (field === 'image') {
      const regexp = /(https?:\/\/.*\.(?:png|jpg|jpeg))/;
      const isImageUrl = regexp.test(value);

      if (isImageUrl) return;

      return {
        [field]: 'Укажите прямую ссылку на изображение с расширением .png, .jpg, jpeg',
      };
    }
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
  };

  return { input, errors, setInput, handleChange, resetForm, submit, handleChangeSelect };
};

export default useForm;

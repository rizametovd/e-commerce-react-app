import classes from './SettingsForm.module.css';
import Button from '../../UI/Button/Button';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import Textarea from '../../UI/Textarea/Textarea';

interface ISettingsFormProps {
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: { [key: string]: string | undefined };
  value: { [key: string]: string };
  labelName: string;
  labelURL: string;
  namePlaceholder: string;
  descriptionPlaceholder: string;
}

const SettingsForm: React.FC<ISettingsFormProps> = ({
  labelName,
  onClose,
  onSubmit,
  onChange,
  errors,
  value,
  labelURL,
  namePlaceholder,
  descriptionPlaceholder,
}) => {
  return (
    <div className={classes.form}>
      <Form onSubmit={onSubmit}>
        <>
          <Input
            label={labelName}
            errorText={errors.name}
            name={'name'}
            type={'text'}
            value={value.name || ''}
            onChange={onChange}
            required
            placeholder={namePlaceholder}
          />

          <Input
            label={labelURL}
            errorText={errors.url}
            name={'url'}
            type={'text'}
            value={value.url || ''}
            onChange={onChange}
            required
            placeholder={'Укажите SEO URL'}
          />

          <Textarea
            label={'Описание'}
            errorText={errors.description}
            name={'description'}
            placeholder={descriptionPlaceholder}
            onChange={onChange}
            value={value.description || ''}
          />

          <div className={classes.action}>
            <Button mode={'secondary'} onClick={onClose}>
              Отмена
            </Button>
            <Button mode={'primary'} type={'submit'}>
              Сохранить
            </Button>
          </div>
        </>
      </Form>
    </div>
  );
};

export default SettingsForm;

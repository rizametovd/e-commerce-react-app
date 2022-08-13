import Button from '../../UI/Button/Button';
import Form from '../../UI/Form/Form';
import Input from '../../UI/Input/Input';
import classes from './CartForm.module.css';

interface ICartFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: { [key: string]: string };
  errors: { [key: string]: string | undefined };
  isLoading: boolean;
}

const CartForm: React.FC<ICartFormProps> = ({ onSubmit, onChange, value, errors, isLoading }) => {
  return (
    <Form onSubmit={onSubmit}>
      <div className={classes['cart-form']}>
        <Input
          label={'Имя'}
          errorText={errors.name || ''}
          name={'name'}
          type={'text'}
          value={value.name || ''}
          onChange={onChange}
          required
          placeholder={'Как вас зовут?'}
        />

        <Input
          label={'Телефон'}
          errorText={errors.phone || ''}
          name={'phone'}
          type={'text'}
          value={value.phone || ''}
          onChange={onChange}
          required
          placeholder={'Сотовый номер'}
        />

        <Input
          label={'Адрес'}
          errorText={errors.address || ''}
          name={'address'}
          type={'text'}
          value={value.address || ''}
          onChange={onChange}
          required
          placeholder={'Куда доставить заказ?'}
        />

        <div className={classes.action}>
          <Button mode={'primary'} type={'submit'} isLoading={isLoading}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default CartForm;

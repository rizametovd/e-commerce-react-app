import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import classes from './Brands.module.css';
import Placeholder from '../../UI/Placeholder/Placeholder';
import SettingsForm from '../SettingsForm/SettingsForm';
import useForm from '../../../hooks/useForm';
import SettingsList from '../SettingsList/SettingsList';
import { AlertType, Brand } from '../../../types/common';
import Card from '../../UI/Card/Card';
import { createBrand, deleteBrand, removeSelectedBrand, selectBrand, updateBrand } from '../../../store/BrandSlice';
import IconButton from '../../UI/IconButton/IconButton';
import AddIcon from '../../UI/icons/AddIcon/AddIcon';
import { showAlert } from '../../../store/CommonSlice';
import { DELETE_BRAND_ALERT_MESSAGE, NO_BRANDS_MESSAGE } from '../../../constants/messages';
import AreaLoader from '../../UI/AreaLoader/AreaLoader';
import { updateAllProductsBrands } from '../../../store/ProductSlice';
import { brandFormValidator } from '../../../utils/validators';

const INIT_INPUT = {
  name: '',
  description: '',
  url: '',
};

const Brands: React.FC = () => {
  const { isLoading, brands, error } = useSelector((state: RootState) => state.brand);
  const { products } = useSelector((state: RootState) => state.product);
  const brandToBeEdited = useSelector((state: RootState) => state.brand.selectedBrand);
  const dispatch = useDispatch<AppDispatch>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { input, setInput, handleChange, errors, submit, resetForm } = useForm(
    INIT_INPUT,
    handleSubmit,
    brandFormValidator
  );
  const isPlaceholderVisible = !isLoading && !error.isError && !isFormOpen && brands?.length === 0;

  const modifedBrands = brands.map((brand) => {
    const productCount = products.filter((product) => product.brand.id === brand.id).length;
    const discountedProductsCount = products.filter(
      (product) => product.brand.id === brand.id && product.discount
    ).length;

    return {
      ...brand,
      productsCount: productCount,
      discountedProductsCount,
    };
  });

  useEffect(() => {
    if (!brandToBeEdited.id) return;

    setInput((prev) => ({
      ...prev,
      ...brandToBeEdited,
    }));
  }, [brandToBeEdited, setInput]);

  function handleSubmit() {
    const name = input.name.trim();
    const description = input.description.trim();

    if (brandToBeEdited.id) {
      const updatedBrand = {
        ...brandToBeEdited,
        ...input,
      };
      dispatch(updateAllProductsBrands(updatedBrand));
      dispatch(updateBrand(updatedBrand));
    } else {
      const newBrand = {
        name,
        description,
      };

      dispatch(createBrand(newBrand));
    }

    closeForm();
  }

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    dispatch(removeSelectedBrand());
    resetForm();
  };

  const deleteBrandHendler = async (id: Brand['id']) => {
    const hasProducts = modifedBrands.some((brand) => brand.id === id && brand.productsCount > 0);

    if (hasProducts) {
      dispatch(showAlert({ type: AlertType.Error, message: DELETE_BRAND_ALERT_MESSAGE }));

      return;
    }
    dispatch(deleteBrand(id));
  };

  const editBrandHandler = (id: Brand['id']) => {
    dispatch(selectBrand(id));
    openForm();
  };

  return (
    <Card>
      <div className={classes.brand}>
        <div className={classes.header}>
          <h3 className={classes.title}>Производители</h3>

          <IconButton onClick={openForm} isDisabled={isFormOpen || error.isError}>
            <AddIcon />
          </IconButton>
        </div>

        {isLoading && <AreaLoader />}

        {!isLoading && error.isError && !isFormOpen && <Placeholder text={error.message} size={'32px'} />}

        {isPlaceholderVisible && !error.isError && <Placeholder text={NO_BRANDS_MESSAGE} size={'32px'} />}

        {isFormOpen && (
          <SettingsForm
            onClose={closeForm}
            onChange={handleChange}
            onSubmit={submit}
            errors={errors}
            value={input}
            labelName={'Название бренда'}
            labelURL={'SEO URL'}
            namePlaceholder={'Укажите название бренда'}
            descriptionPlaceholder={'Описание бренда'}
          />
        )}

        {!isFormOpen && brands?.length > 0 && (
          <SettingsList items={modifedBrands} onEdit={editBrandHandler} onDelete={deleteBrandHendler} />
        )}
      </div>
    </Card>
  );
};

export default Brands;

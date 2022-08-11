import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  deleteCategory,
  removeSelectedCategory,
  selectCategory,
  updateCategory,
} from '../../../store/CategorySlice';
import { AppDispatch, RootState } from '../../../store/store';
import Placeholder from '../../UI/Placeholder/Placeholder';
import classes from './Categories.module.css';
import SettingsForm from '../SettingsForm/SettingsForm';
import useForm from '../../../hooks/useForm';
import SettingsList from '../SettingsList/SettingsList';
import { AlertType, Category } from '../../../types/common';
import Card from '../../UI/Card/Card';
import IconButton from '../../UI/IconButton/IconButton';
import AddIcon from '../../UI/icons/AddIcon/AddIcon';
import { DELETE_CATEGORY_ALERT_MESSAGE, NO_CATEGORIES_MESSAGE } from '../../../constants/messages';
import { showAlert } from '../../../store/CommonSlice';
import AreaLoader from '../../UI/AreaLoader/AreaLoader';
import { updateAllProductsCategories } from '../../../store/ProductSlice';
import { categoryFormValidator } from '../../../utils/validators';

const INIT_INPUT = {
  name: '',
  description: '',
  url: '',
};

const Categories: React.FC = () => {
  const { isLoading, categories, error } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);
  const categoryToBeEdited = useSelector((state: RootState) => state.category.selectedCategory);
  const dispatch = useDispatch<AppDispatch>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isPlaceholderVisible = !isLoading && !error.isError && !isFormOpen && categories.length === 0;
  const { input, setInput, handleChange, errors, submit, resetForm } = useForm(
    INIT_INPUT,
    handleSubmit,
    categoryFormValidator
  );

  const modifedCategories = categories.map((category) => {
    const productCount = products.filter((product) => product.category.id === category.id).length;
    const discountedProductsCount = products.filter(
      (product) => product.category.id === category.id && product.discount
    ).length;
    return {
      ...category,
      productsCount: productCount,
      discountedProductsCount,
    };
  });

  useEffect(() => {
    if (!categoryToBeEdited.id) return;

    setInput((prev) => ({
      ...prev,
      ...categoryToBeEdited,
    }));
  }, [categoryToBeEdited, setInput]);

  function handleSubmit() {
    const name = input.name?.trim();
    const description = input.description?.trim();
    const url = input?.url.trim();

    if (categoryToBeEdited.id) {
      const updatedCategory = {
        ...categoryToBeEdited,
        ...input,
      };

      dispatch(updateAllProductsCategories(updatedCategory));
      dispatch(updateCategory(updatedCategory));
    } else {
      const newCategory = {
        name,
        description,
        url,
      };

      dispatch(createCategory(newCategory));
    }

    closeForm();
  }

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    dispatch(removeSelectedCategory());
    resetForm();
  };

  const deleteCategoryHendler = async (id: Category['id']) => {
    const hasProducts = modifedCategories.some((category) => category.id === id && category.productsCount > 0);

    if (hasProducts) {
      dispatch(showAlert({ type: AlertType.Error, message: DELETE_CATEGORY_ALERT_MESSAGE }));
      return;
    }

    dispatch(deleteCategory(id));
  };

  const editCategoryHandler = (id: Category['id']) => {
    dispatch(selectCategory(id));
    openForm();
  };

  return (
    <Card>
      <div className={classes.category}>
        <div className={classes.header}>
          <h3 className={classes.title}>Категории</h3>
          <IconButton onClick={openForm} isDisabled={isFormOpen || error.isError}>
            <AddIcon />
          </IconButton>
        </div>

        {isLoading && <AreaLoader />}

        {!isLoading && error.isError && !isFormOpen && <Placeholder text={error.message} />}

        {isPlaceholderVisible && <Placeholder text={NO_CATEGORIES_MESSAGE} />}

        {isFormOpen && (
          <SettingsForm
            onClose={closeForm}
            onChange={handleChange}
            onSubmit={submit}
            errors={errors}
            value={input}
            labelName={'Название категории'}
            labelURL={'SEO URL'}
            namePlaceholder={'Укажите название категории'}
            descriptionPlaceholder={'Описание категории'}
          />
        )}

        {!isFormOpen && categories?.length > 0 && (
          <SettingsList items={modifedCategories} onEdit={editCategoryHandler} onDelete={deleteCategoryHendler} />
        )}
      </div>
    </Card>
  );
};

export default Categories;

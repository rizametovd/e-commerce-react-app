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
import { wait } from '../../../utils/helpers';
import { hideAlert, showAlert } from '../../../store/CommonSlice';
import AreaLoader from '../../UI/AreaLoader/AreaLoader';
import { updateAllProductsCategories } from '../../../store/ProductSlice';

const INIT_INPUT = {
  name: '',
  description: '',
  url:''
};

const VALIDATE_FIELDS = ['name'];

const Categories: React.FC = () => {
  const { isLoading, categories } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);
  const categoryToBeEdited = useSelector((state: RootState) => state.category.selectedCategory);
  const dispatch = useDispatch<AppDispatch>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isPlaceholderVisible = !isLoading && !isFormOpen && categories?.length === 0;
  const { input, setInput, handleChange, errors, submit, resetForm } = useForm(
    INIT_INPUT,
    VALIDATE_FIELDS,
    handleSubmit
  );

  const modifedCategories = categories.map((category) => {
    const productCount = products.filter((product) => product.category.id === category.id).length;

    return {
      ...category,
      productsCount: productCount,
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

    console.log('input:', input)
    const name = input.name?.trim();
    const description = input.description?.trim();
    const url = input?.url.trim()

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
        url
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

      await wait(1500);
      dispatch(hideAlert());

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
          <IconButton onClick={openForm} isDisabled={isFormOpen}>
            <AddIcon />
          </IconButton>
        </div>

        {isLoading && <AreaLoader />}

        {isPlaceholderVisible && <Placeholder text={NO_CATEGORIES_MESSAGE} size={'32px'} />}

        {isFormOpen && (
          <SettingsForm
            onClose={closeForm}
            onChange={handleChange}
            onSubmit={submit}
            errors={errors}
            value={input}
            title={'Категории'}
            labelName={'Название категории'}
            labelURL={'SEO URL'}
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

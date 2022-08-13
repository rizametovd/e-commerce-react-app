import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import ProductForm from '../../../admin/ProductForm/ProductForm';
import Placeholder from '../../../UI/Placeholder/Placeholder';
import Actions from '../../../layouts/adminLayouts/Actions/Actions';
import Content from '../../../layouts/adminLayouts/Content/Content';
import ProductsList from '../../../admin/ProductsList/ProductsList';
import { removeSelectedProduct } from '../../../../store/ProductSlice';
import Loader from '../../../UI/Loader/Loader';
import {
  ADD_BRAND_AND_CATEGORY_MESSAGE,
  ADD_BRAND_MESSAGE,
  ADD_CATEGORY_MESSAGE,
  NO_PRODUCTS_MESSAGE,
} from '../../../../constants/messages';

const ProductsPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { brand, category, product } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const isDataLoading = [brand.isLoading, category.isLoading, product.isLoading].some(Boolean);
  const hasCategories = category.categories.length > 0;
  const hasProducts = product.products.length > 0;
  const hasBrands = brand.brands.length > 0;
  const isFetchingError = product.error.isError;
  const isProductListVisible = hasCategories && hasProducts && hasBrands && !isFormOpen && !isFetchingError;

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    dispatch(removeSelectedProduct());
  };

  return (
    <>
      <Actions
        title={'Товары'}
        onAction={openForm}
        actionBtnText={'Добавить товар'}
        isOpen={isFormOpen}
        isDisabled={!hasCategories || !hasBrands}
      />

      <Content>
        <>
          {isDataLoading && <Loader />}

          {!isDataLoading && isFetchingError && <Placeholder text={product.error.message} />}

          {!isDataLoading && !isFetchingError && !hasCategories && <Placeholder text={ADD_CATEGORY_MESSAGE} />}

          {!isDataLoading && !isFetchingError && !hasBrands && <Placeholder text={ADD_BRAND_MESSAGE} />}

          {!isDataLoading && !isFetchingError && !hasBrands && !hasCategories && (
            <Placeholder text={ADD_BRAND_AND_CATEGORY_MESSAGE} />
          )}

          {!isDataLoading && !isFetchingError && !hasProducts && !hasBrands && !hasCategories && (
            <Placeholder text={NO_PRODUCTS_MESSAGE} />
          )}

          {isProductListVisible && (
            <ProductsList
              products={product.products}
              onOpen={openForm}
              isLoading={product.isLoading}
              categories={category.categories}
              brands={brand.brands}
            />
          )}
          {isFormOpen && <ProductForm onClose={closeForm} categories={category.categories} brands={brand.brands} />}
        </>
      </Content>
    </>
  );
};

export default ProductsPage;

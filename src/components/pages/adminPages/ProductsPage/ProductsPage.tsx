import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import ProductForm from '../../../admin/ProductForm/ProductForm';
import Placeholder from '../../../UI/Placeholder/Placeholder';
import Actions from '../../../layouts/adminLayouts/Actions/Actions';
import Content from '../../../layouts/adminLayouts/Content/Content';
import ProductsList from '../../../admin/ProductsList/ProductsList';
import { removeSelectedProduct, resetProductError } from '../../../../store/ProductSlice';
import Loader from '../../../UI/Loader/Loader';
import {
  ADD_BRAND_AND_CATEGORY_MESSAGE,
  ADD_BRAND_MESSAGE,
  ADD_CATEGORY_MESSAGE,
  NO_PRODUCTS_MESSAGE,
} from '../../../../constants/messages';
import Toast from '../../../UI/Toast/Toast';
import { AlertType } from '../../../../types/common';

const ProductsPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { products, error } = useSelector((state: RootState) => state.product);
  const { brand, category, product } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const hasCategories = category.categories.length > 0;
  const hasProducts = products.length > 0;
  const hasBrands = brand.brands.length > 0;

  const productsIsLoading = !hasProducts && product.isLoading;
  const isProductListVisible = hasCategories && hasProducts && hasBrands && !isFormOpen;
  const isDataLoading = [brand.isLoading, category.isLoading, product.isLoading].some(Boolean);
  const isAddCategoryPlaceholderVisible = !hasCategories && !isDataLoading;
  const isAddBrandPlaceholderVisible = !isDataLoading && !hasBrands;
  const isNoBrandsAndNoCategories = isAddCategoryPlaceholderVisible && isAddBrandPlaceholderVisible;
  const isNoProductsPlaceholderVisible =
    !product.isLoading && !hasProducts && !isFormOpen && hasCategories && hasBrands;

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    dispatch(removeSelectedProduct());
  };

  const handleProductErrorToast = () => {
    dispatch(resetProductError());
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
          <Toast message={error.message} type={AlertType.Error} onClose={handleProductErrorToast} />

          {productsIsLoading && <Loader />}
          {isAddCategoryPlaceholderVisible && <Placeholder text={ADD_CATEGORY_MESSAGE} size={'36px'} />}

          {isNoBrandsAndNoCategories && <Placeholder text={ADD_BRAND_AND_CATEGORY_MESSAGE} size={'36px'} />}
          {isAddBrandPlaceholderVisible && <Placeholder text={ADD_BRAND_MESSAGE} size={'36px'} />}
          {isNoProductsPlaceholderVisible && <Placeholder text={NO_PRODUCTS_MESSAGE} size={'36px'} />}

          {isProductListVisible && (
            <ProductsList
              products={products}
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

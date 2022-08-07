import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NO_FILTERED_RESULTS } from '../../../constants/messages';
import { deleteProduct, selectProduct } from '../../../store/ProductSlice';
import { AppDispatch } from '../../../store/store';
import { Brand, Category, Option, Product } from '../../../types/common';
import AreaLoader from '../../UI/AreaLoader/AreaLoader';
import Card from '../../UI/Card/Card';
import IconButton from '../../UI/IconButton/IconButton';
import EditIcon from '../../UI/icons/EditIcon/EditIcon';
import TrashIcon from '../../UI/icons/TrashIcon/TrashIcon';
import Placeholder from '../../UI/Placeholder/Placeholder';
import Select from '../../UI/Select/Select';
import classes from './ProductsList.module.css';

interface IProductsListProps {
  products: Product[];
  brands: Brand[];
  onOpen: () => void;
  isLoading: boolean;
  categories: Category[];
}

const ProductsList: React.FC<IProductsListProps> = ({ products, onOpen, isLoading, categories, brands }) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState<Option>({});
  const [selectedBrandOption, setSelectedBrandOption] = useState<Option>({});
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>(brands);
  const dispatch = useDispatch<AppDispatch>();
  const hasNoFilteredProducts = productList.length === 0;

  useEffect(()=> {
    setProductList(products)
  }, [products])

  const filterProductsByCategory = (
    products: Product[],
    brands: Brand[],
    id: Option['id'],
    selectedBrandOptionId: Option['id'] = ''
  ) => {
    const filteredProducts = products.filter((product) => product.category.id === id);
    const brandIds = Array.from(new Set(filteredProducts.map((product) => product.brand.id)));
    const filteredBrands = brands.filter((brand) => brandIds.includes(brand.id));

    if (selectedBrandOptionId) {
      const filteredProductsByCategoryAndBrand = products.filter((product) => {
        return product.category.id === id && product.brand.id === selectedBrandOption.id;
      });
      return {
        filteredProducts,
        filteredBrands,
        filteredProductsByCategoryAndBrand,
      };
    }

    return {
      filteredProducts,
      filteredBrands,
    };
  };

  const filterProductsByBrand = (
    products: Product[],
    categories: Category[],
    id: Option['id'],
    selectedCategoryOptionId: Option['id'] = ''
  ) => {
    const filteredProducts = products.filter((product) => product.brand.id === id);
    const categoriesIds = Array.from(new Set(filteredProducts.map((product) => product.category.id)));
    const filteredCategories = categories.filter((category) => categoriesIds.includes(category.id));

    if (selectedCategoryOptionId) {
      const filteredProductsByCategoryAndBrand = products.filter((product) => {
        return product.category.id === selectedCategoryOption.id && product.brand.id === id;
      });

      return {
        filteredProducts,
        filteredCategories,
        filteredProductsByCategoryAndBrand,
      };
    }

    return {
      filteredProducts,
      filteredCategories,
    };
  };

  const handleChangeSelect = (option: Option) => {
    const isCategoryOptionSetToDefaultAndBrandOptionNotSelected =
      !option.id && option.field === 'category' && !selectedBrandOption.id;
    const isCategoryOptionSetToDefaultAndBrandOptionSelected =
      !option.id && option.field === 'category' && selectedBrandOption.id;
    const isCategoryOptionSelectedAndBrandOptionIsDefault = option.field === 'category' && !selectedBrandOption.id;
    const isBrandOptionSelectedAndSetCategoryOption = option.field === 'category' && selectedBrandOption.id;

    const isBrandOptionSetToDefaultAndCategoryOptionNotSelected =
      !option.id && option.field === 'brand' && !selectedCategoryOption.id;
    const isBrandOptionSetToDefaultAndCategoryOptionSelected =
      !option.id && option.field === 'brand' && selectedCategoryOption.id;
    const isCategoryOptionSelectedAndSetBrandOption = option.field === 'brand' && selectedCategoryOption.id;
    const isBrandOptionSetAndCategoryOptionIsDefault = option.field === 'brand' && !selectedCategoryOption.id;

    if (isCategoryOptionSetToDefaultAndBrandOptionNotSelected) {
      console.log('0');
      setProductList(products);
      setSelectedCategoryOption({});
      setFilteredBrands(brands);
      return;
    }

    if (isCategoryOptionSetToDefaultAndBrandOptionSelected) {
      const { filteredProducts } = filterProductsByBrand(products, categories, selectedBrandOption.id);
      setProductList(filteredProducts);
      setSelectedCategoryOption({});
      setFilteredBrands(brands);
      return;
    }

    if (isBrandOptionSetToDefaultAndCategoryOptionNotSelected) {
      setProductList(products);
      setFilteredCategories(categories);
      setSelectedBrandOption({});
      return;
    }

    if (isBrandOptionSetToDefaultAndCategoryOptionSelected) {
      const { filteredProducts } = filterProductsByCategory(products, brands, selectedCategoryOption.id);

      setFilteredCategories(categories);
      setProductList(filteredProducts);
      setSelectedBrandOption({});
      return;
    }

    if (isCategoryOptionSelectedAndBrandOptionIsDefault) {
      const { filteredProducts, filteredBrands } = filterProductsByCategory(products, brands, option.id);
      setFilteredBrands(filteredBrands);
      setProductList(filteredProducts);
      setSelectedCategoryOption(option);
    }

    if (isCategoryOptionSelectedAndSetBrandOption) {
      const { filteredCategories, filteredProductsByCategoryAndBrand } = filterProductsByBrand(
        products,
        categories,
        option.id,
        selectedCategoryOption.id
      );
      setFilteredCategories(filteredCategories);
      setSelectedBrandOption(option);

      if (filteredProductsByCategoryAndBrand) {
        setProductList(filteredProductsByCategoryAndBrand);
      }
    }

    if (isBrandOptionSelectedAndSetCategoryOption) {
      const { filteredBrands, filteredProductsByCategoryAndBrand } = filterProductsByCategory(
        products,
        brands,
        option.id,
        selectedBrandOption.id
      );
      setFilteredBrands(filteredBrands);
      setSelectedCategoryOption(option);

      if (filteredProductsByCategoryAndBrand) {
        setProductList(filteredProductsByCategoryAndBrand);
      }
    }

    if (isBrandOptionSetAndCategoryOptionIsDefault) {
      const { filteredProducts, filteredCategories } = filterProductsByBrand(products, categories, option.id);
      setFilteredCategories(filteredCategories);
      setProductList(filteredProducts);
      setSelectedBrandOption(option);
    }
  };

  const deleteProductHandler = (id: Product['id']) => {
    dispatch(deleteProduct(id));
  };

  const editProductHandler = (id: Product['id']) => {
    dispatch(selectProduct(id));
    onOpen();
  };

  return (
    <Card fullWidth>
      <>
        {isLoading && <AreaLoader />}
        <table>
          <thead>
            <tr>
              <th className={classes['foto-th']}>Фото</th>
              <th>Название</th>
              <th className={classes['category-th']}>Категория</th>
              <th className={classes['brand-th']}>Бренд</th>
              <th className={classes['price-th']}>Цена</th>
              <th className={classes['action-th']}></th>
            </tr>
          </thead>
          <tbody>
            <tr className={classes['filter-row']}>
              <td></td>
              <td></td>
              <td>
                <Select
                  options={filteredCategories}
                  onSelect={handleChangeSelect}
                  defaultOptionText={'Выберите категорию'}
                  label=""
                  value={selectedCategoryOption.name}
                  field={'category'}
                  isDisabled={filteredCategories.length === 0}
                />
              </td>
              <td>
                <Select
                  options={filteredBrands}
                  onSelect={handleChangeSelect}
                  defaultOptionText={'Выберите бренд'}
                  label=""
                  value={selectedBrandOption.name}
                  field={'brand'}
                  isDisabled={filteredBrands.length === 0}
                />
              </td>
              <td></td>
              <td></td>
            </tr>
            {hasNoFilteredProducts && (
              <tr>
                <td colSpan={6}>
                  <Placeholder text={NO_FILTERED_RESULTS} size={'24px'} />
                </td>
              </tr>
            )}
            {productList.map(({ id, image, price, brand, category, name }) => {
              return (
                <tr key={id}>
                  <td>
                    <img className={classes.image} src={image} alt={name} />
                  </td>
                  <td>{name}</td>
                  <td>{category.name}</td>
                  <td>{brand.name}</td>
                  <td>{price} ₽</td>
                  <td className={classes['action-cell']}>
                    <div className={classes.action}>
                      <IconButton onClick={() => editProductHandler(id)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton onClick={() => deleteProductHandler(id)}>
                        <TrashIcon />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    </Card>
  );
};

export default ProductsList;

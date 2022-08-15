import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/common';

const useFilterByBrand = (products: Product[], checkboxBrands: any[]) => {
  const [checkedFilterItems, setCheckedFilterItems] = useState<string[]>([]);
  const { url } = useParams();

  const checkboxItems = checkboxBrands.filter((brand) => {
    const product = products.some((product) => product.brand.id === brand.id);
    if (product) {
      return brand;
    }
    return null;
  });

  useEffect(() => {
    if (url) {
      setCheckedFilterItems([]);
    }
  }, [url]);

  const checkFilterItem = (id: string) => {
    if (checkedFilterItems.includes(id)) {
      const checkedItems = checkedFilterItems.filter((item) => item !== id);

      setCheckedFilterItems(checkedItems);
      return;
    }

    setCheckedFilterItems((prev) => [...prev, id]);
  };

  const productsTorender =
    checkedFilterItems.length > 0
      ? products.filter((product) => checkedFilterItems.includes(product.brand.id))
      : products;

  return {
    checkFilterItem,
    productsTorender,
    checkboxItems,
  };
};

export default useFilterByBrand;

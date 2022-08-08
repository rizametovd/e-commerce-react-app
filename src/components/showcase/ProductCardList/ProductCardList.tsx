import { Product } from '../../../types/common';
import ProductCard from '../ProductCard/ProductCard';
import classes from './ProductCardList.module.css';

interface IProductCardListProps {
  products: Product[];
}

const ProductCardList: React.FC<IProductCardListProps> = ({ products }) => {
  return (
    <ul className={classes.list}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          discount={product.discount}
          brand={product.brand.name}
          category={product.category.name}
        />
      ))}
    </ul>
  );
};

export default ProductCardList;

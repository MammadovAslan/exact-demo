import { useEffect, memo } from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import getData from "../utils/getData";
const ProductsContainer = ({ products, setProducts }) => {
  useEffect(() => {
    getData(true, setProducts);
  }, []);

  return (
    <div className="products-container">
      {products &&
        products.length > 0 &&
        products.map((el) => (
          <Product
            aspectRatio={el.aspectRatio}
            rimDiameter={el.rimDiameter}
            id={el.id}
            image={el.image}
            model={el.model}
            price={el.price}
            width={el.width}
            brand={el.brand}
            rating={el.rating}
            key={el.id}
          />
        ))}
    </div>
  );
};

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      aspectRatio: PropTypes.number.isRequired,
      brand: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      rimDiameter: PropTypes.number.isRequired,
    })
  ),
  setProducts: PropTypes.func.isRequired,
};
export default memo(ProductsContainer);

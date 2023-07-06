import { useEffect, memo } from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import getData from "../utils/getData";
import { useQueriesStore } from "../zustand/store";
const ProductsContainer = ({ products, setProducts }) => {
  const setQueries = useQueriesStore((state) => state.setQueries);

  const fetchData = async () => {
    try {
      const data = await getData(true);
      setProducts(data.result);

      setQueries({
        maxPrice: data.aggregation["max:price"],
        minPrice: data.aggregation["min:price"],
        width: data.aggregation["distinct:width"],
        aspectRatio: data.aggregation["distinct:aspectRatio"],
        rimDiameter: data.aggregation["distinct:rimDiameter"],
        brand: data.aggregation["distinct:brand"],
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchData();
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

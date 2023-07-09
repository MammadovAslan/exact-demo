import { useEffect, memo } from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import { useQueriesStore } from "../zustand/store";
import data from "../data/index.json";

const ProductsContainer = ({ products, setProducts }) => {
  const setQueries = useQueriesStore((state) => state.setQueries);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
      try {
        // const response = await fetch(`${apiUrl}/index`, {
        //   method: "GET",
        // });
        // const data = await response.json();
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
    console.log
  }, []);

  if (products.length === 0) {
    return <div>No results</div>;
  }
  return (
    <div className="products-container">
      {products &&
        products.length > 0 &&
        products.map((el) => (
          <Product
            aspectRatio={el.aspectRatio}
            rimDiameter={el.rimDiameter}
            id={el.id}
            image={el.image_thumb}
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

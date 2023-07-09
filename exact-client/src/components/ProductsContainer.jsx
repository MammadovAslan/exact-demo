import { useEffect, useState, memo } from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import { useQueriesStore } from "../zustand/store";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import data from "../data/index.json";
import "react-loading-skeleton/dist/skeleton.css";

const ProductsContainer = ({ products, setProducts }) => {
  const setQueries = useQueriesStore((state) => state.setQueries);
  const apiUrl = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    // Display skeleton loading animations while loading
    return (
      <div className="products-container">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="product skeleton">
            <SkeletonTheme baseColor="#e9e1e1" highlightColor="#d7d0d0">
              <p>
                <Skeleton count={3} />
              </p>
            </SkeletonTheme>{" "}
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <div>No results</div>;
  }
  return (
    <div className="products-container">
      {products &&
        products.length > 0 &&
        products.map((el) => (
          <Product
            id={el.id}
            image={el.image_thumb}
            model={el.model}
            price={el.price}
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

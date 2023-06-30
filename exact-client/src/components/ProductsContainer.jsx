import { useEffect } from "react";
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
            availabitity={el.availability}
            description={el.description}
            diameter={el.rimDiameter}
            id={el.id}
            img={el.image}
            name={el.productName}
            price={el.price}
            season={el.seasonCategory}
            width={el.width}
            key={el.id}
          />
        ))}
    </div>
  );
};

ProductsContainer.propTypes = {
  products:
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        vehicleType: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        aspectRatio: PropTypes.number.isRequired,
        construction: PropTypes.string.isRequired,
        rimDiameter: PropTypes.number.isRequired,
        loadIndex: PropTypes.number.isRequired,
        speedRating: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        seasonCategory: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        availability: PropTypes.string.isRequired,
        treadDepth: PropTypes.number.isRequired,
        treadWearRating: PropTypes.number.isRequired,
        treadPattern: PropTypes.string.isRequired,
        wetTractionRating: PropTypes.string.isRequired,
        dryTractionRating: PropTypes.string.isRequired,
        noiseLevel: PropTypes.string.isRequired,
        sidewallStyle: PropTypes.string.isRequired,
        runFlat: PropTypes.bool.isRequired,
        reinforcedSidewalls: PropTypes.bool.isRequired,
        fuelEfficiencyRating: PropTypes.string.isRequired,
      })
    ),
  setProducts: PropTypes.func.isRequired,
};
export default ProductsContainer;

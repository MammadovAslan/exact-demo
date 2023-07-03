import PropTypes from "prop-types";
import { useState, useEffect, memo } from "react";
import Dropdown from "./Dropdown";
import { getProperty, getPrice } from "../utils/getProperty";
import getData from "../utils/getData";
import PriceInput from "./PriceInput";
import RangeSlider from "./RangeSlider";
import { queryStringify } from "../utils/helpers";

const Form = ({ products, setProducts }) => {
  const [brandsOptions, setBrands] = useState([]);
  const [widthOptions, setWidthOptions] = useState([]);
  const [aspectRatioOptions, setAspectRatioOptions] = useState([]);
  const [rimDiameterOptions, setRimDiameterOptions] = useState([]);

  const [userPrice, setUserPrice] = useState(false);

  const [queries, setQueries] = useState({
    brand: [],
    width: [],
    aspectRatio: [],
    rimDiameter: [],
    minPrice: 0,
    maxPrice: 0,
  });

  const [queriesString, setQueriesString] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getData(queriesString || true, setProducts);
  };

  useEffect(() => {
    if (products.length > 0) {
      if (!userPrice) {
        //get min and max prices
        setQueries((prev) => ({
          ...prev,
          minPrice: getPrice(products, true),
          maxPrice: getPrice(products, false),
        }));
      }

      //get select options
      setBrands(getProperty(products, "brand"));
      setWidthOptions(getProperty(products, "width"));
      setAspectRatioOptions(getProperty(products, "aspectRatio"));
      setRimDiameterOptions(getProperty(products, "rimDiameter"));
      setUserPrice(false);
    }
  }, [products]);

  useEffect(() => {
    setQueriesString(queryStringify(queries));
  }, [queries]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="selects-container">
        <Dropdown
          options={brandsOptions}
          placeholder="brand"
          setValue={setQueries}
          property="brand"
        />
        <Dropdown
          options={widthOptions}
          placeholder="width"
          setValue={setQueries}
          property="width"
        />
        <Dropdown
          options={rimDiameterOptions}
          placeholder="diameter"
          setValue={setQueries}
          property="rimDiameter"
        />
        <Dropdown
          options={aspectRatioOptions}
          placeholder="ratio"
          setValue={setQueries}
          property="aspectRatio"
        />
      </div>
      <div className="price-inputs-container">
        <h4 className="price-title">Price:</h4>
        <PriceInput
          setUserPrice={setUserPrice}
          setValue={setQueries}
          maxPrice={queries.maxPrice}
          minPrice={queries.minPrice}
        />

        <RangeSlider
          onChange={({ min, max }) => {
            setQueries((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
            setUserPrice(true);
          }}
          min={50}
          max={500}
        />
      </div>
      <button className="submit-button">submit</button>
    </form>
  );
};

Form.propTypes = {
  products: PropTypes.arrayOf(
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

export default memo(Form);

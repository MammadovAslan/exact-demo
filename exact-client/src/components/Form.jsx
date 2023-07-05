import PropTypes from "prop-types";
import { useState, useEffect, memo } from "react";
import Dropdown from "./Dropdown";
import { getProperty, getPrice } from "../utils/getProperty";
import getData from "../utils/getData";
import PriceInput from "./PriceInput";
import { queryStringify } from "../utils/helpers";
import SortInput from "./SortInput";

const Form = ({ products, setProducts }) => {
  const [brandsOptions, setBrands] = useState([]);
  const [widthOptions, setWidthOptions] = useState([]);
  const [aspectRatioOptions, setAspectRatioOptions] = useState([]);
  const [rimDiameterOptions, setRimDiameterOptions] = useState([]);
  const [priceSort, setPriceSort] = useState(null);

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
    getData(
      queriesString || true,
      setProducts,
      priceSort ? "price" : "",
      priceSort ? priceSort : 0
    );
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
      <div className="controls">
        <div className="price-inputs-container">
          <h4 className="title">Price:</h4>
          <PriceInput
            setUserPrice={setUserPrice}
            setValue={setQueries}
            minPrice={queries.minPrice}
            maxPrice={queries.maxPrice}
          />

          {/* <RangeSlider
            onChange={({ min, max }) => {
              setQueries((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
              setUserPrice(true);
            }}
            min={50}
            max={5000}
          /> */}
        </div>
        <div className="sort-inputs-container">
          <SortInput
            id="price-sort"
            value={priceSort}
            setValue={setPriceSort}
            setUserPrice={setUserPrice}
            name="price"
          />
          {/* <SortInput
            id="rating-sort"
            value={ratingSort}
            setValue={setRatingSort}
            setUserPrice={setUserPrice}
            name="rating"
          /> */}
        </div>
      </div>
      <button className="submit-button">submit</button>
    </form>
  );
};

Form.propTypes = {
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

export default memo(Form);

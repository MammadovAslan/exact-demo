import PropTypes from "prop-types";
import { useState, useEffect, memo } from "react";
import Dropdown from "./Dropdown";
import { getProperty, getPrice } from "../utils/getProperty";
import getData from "../utils/getData";
import PriceInput from "./PriceInput";
import { queryStringify } from "../utils/helpers";
import SortInput from "./SortInput";
import { useQueriesStore } from "../zustand/store";

const Form = ({ products, setProducts }) => {
  const [brandsOptions, setBrands] = useState([]);
  const [widthOptions, setWidthOptions] = useState([]);
  const [aspectRatioOptions, setAspectRatioOptions] = useState([]);
  const [rimDiameterOptions, setRimDiameterOptions] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceSort, setPriceSort] = useState(null);

  const [userPrice, setUserPrice] = useState(false);

  const dataOptions = useQueriesStore.getState().queries;
  const setDataOptions = useQueriesStore((state) => state.setQueries);

  const [queriesString, setQueriesString] = useState("");
  const [queries, setQueries] = useState({
    brand: [],
    width: [],
    aspectRatio: [],
    rimDiameter: [],
    minPrice: 0,
    maxPrice: 0,
  });

  const fetchData = async () => {
    try {
      const data = await getData(
        queriesString || true,
        priceSort && "price",
        priceSort && priceSort
      );
      setProducts(data.result);

      setDataOptions({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    if (dataOptions.brand.length > 0) {
      setBrands(dataOptions.brand);
      setWidthOptions(dataOptions.width);
      setAspectRatioOptions(dataOptions.aspectRatio);
      setRimDiameterOptions(dataOptions.rimDiameter);
      setMinPrice(dataOptions.minPrice);
      setMaxPrice(dataOptions.maxPrice);
      setUserPrice(false);
    }
  }, [dataOptions]);

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
            minPrice={minPrice}
            maxPrice={maxPrice}
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

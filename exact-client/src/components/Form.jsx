import PropTypes from "prop-types";
import { useState, useEffect, memo } from "react";
import Dropdown from "./Dropdown";
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

  const [userPrice, setUserPrice] = useState(true);

  const dataOptions = useQueriesStore.getState().queries;
  const setDataOptions = useQueriesStore((state) => state.setQueries);
  const storeQueries = useQueriesStore((state) => state.queries);

  const [queriesString, setQueriesString] = useState("");
  const [queries, setQueries] = useState({
    brand: [],
    width: 0,
    aspectRatio: 0,
    rimDiameter: 0,
    minPrice: 0,
    maxPrice: 0,
  });

  const fetchData = async () => {
    try {
      const data = await getData(
        queriesString || true,
        priceSort && "price",
        priceSort ? priceSort : 0
      );
      setProducts(data.result);

      const updatedQueries = { ...storeQueries };

      for (const key in queries) {
        if (+queries[key] === 0) {
          updatedQueries[key] = data.aggregation[`distinct:${key}`];
        }
      }

      setDataOptions(updatedQueries);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // fetchData();
  };

  useEffect(() => {
    if (dataOptions?.brand?.length > 0) {
      setBrands(dataOptions.brand);
      setWidthOptions(dataOptions.width);
      setAspectRatioOptions(dataOptions.aspectRatio);
      setRimDiameterOptions(dataOptions.rimDiameter);

      if (userPrice) {
        setMinPrice(dataOptions.minPrice);
        setMaxPrice(dataOptions.maxPrice);
      }
      setUserPrice(false);
    }
  }, [dataOptions]);

  useEffect(() => {
    setQueriesString(queryStringify(queries));
  }, [queries]);

  useEffect(() => {
    queriesString && fetchData();
  }, [queriesString, priceSort]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="selects-container">
        <Dropdown
          options={brandsOptions}
          placeholder="brand"
          setValue={setQueries}
          property="brand"
          multiSelect={true}
        />
        <Dropdown
          options={widthOptions}
          placeholder="width"
          setValue={setQueries}
          property="width"
        />
        <Dropdown
          options={aspectRatioOptions}
          placeholder="ratio"
          setValue={setQueries}
          property="aspectRatio"
        />
        <Dropdown
          options={rimDiameterOptions}
          placeholder="diameter"
          setValue={setQueries}
          property="rimDiameter"
        />
      </div>
      <div className="controls">
        <div className="price-inputs-container">
          <h1 className="title">Price:</h1>
          <PriceInput
            setUserPrice={setUserPrice}
            setValue={setQueries}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
        <div className="sort-inputs-container">
          <SortInput
            id="price-sort"
            value={priceSort}
            setValue={setPriceSort}
            setUserPrice={setUserPrice}
            name="price"
          />
        </div>
      </div>
      {/* <button className="submit-button">submit</button> */}
    </form>
  );
};

Form.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      aspectRatio: PropTypes.number.isRequired,
      brand: PropTypes.string.isRequired,
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

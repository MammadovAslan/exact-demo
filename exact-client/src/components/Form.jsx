import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { getProperty, getPrice } from "../utils/getProperty";
import getData from "../utils/getData";
import PriceInput from "./PriceInput";
const Form = ({ products, setProducts }) => {
  const [brandsOptions, setBrands] = useState([]);
  const [widthOptions, setWidthOptions] = useState([]);
  const [aspectRatioOptions, setAspectRatioOptions] = useState([]);
  const [rimDiameterOptions, setRimDiameterOptions] = useState([]);

  const [queries, setQueries] = useState({
    brand: [],
    width: [],
    aspectRatio: [],
    rimDiameter: [],
    minPrice: 0,
    maxPrice: 0,
  });

  const [queriesString, setQueriesString] = useState("");

  const queryStringify = () => {
    let string = "";
    let isFirst = true;

    for (const key in queries) {
      if (Array.isArray(queries[key]) && queries[key].length > 0) {
        const selects = queries[key].map((el) => {
          return isNaN(+el) ? `'${el}'` : el;
        });

        if (!isFirst) {
          string += " and ";
        } else {
          isFirst = false;
        }

        string += `${key} in [${selects.join(",")}]`;
      }
    }

    return string;
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setQueriesString(queryStringify());
    console.log(queries)
  }, [queries]);

  useEffect(() => {
    // getData(queriesString || true, setProducts);
  }, [queriesString]);

  useEffect(() => {
    if (products.length>0) {
      setBrands(getProperty(products, "brand"));
      setWidthOptions(getProperty(products, "width"));
      setAspectRatioOptions(getProperty(products, "aspectRatio"));
      setRimDiameterOptions(getProperty(products, "rimDiameter"));

      setQueries((prev) => ({ ...prev, minPrice: getPrice(products, true) }));
      setQueries((prev) => ({ ...prev, maxPrice: getPrice(products, false) }));
    }
  }, [products]);

  return (
    <form className="form" onSubmit={submitHandler}>
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
      <PriceInput setValue={setQueries} maxPrice={queries.maxPrice} minPrice={queries.minPrice} />
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

export default Form;

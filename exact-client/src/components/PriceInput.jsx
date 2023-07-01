import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const PriceInput = ({ setValue, minPrice, maxPrice }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const debouncedMin = useDebounce(min, 1000);
  const debouncedMax = useDebounce(max, 1000);

  const handleChange = (e) => {
    if (e.target.id === "min-price") {
      setMin(+e.target.value);
    } else if (e.target.id === "max-price") {
      setMax(+e.target.value);
    }
  };

  useEffect(() => {
    setValue((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  }, [debouncedMin, debouncedMax]);

  useEffect(() => {
    setMin(minPrice);
    setMax(maxPrice);
  }, [minPrice, maxPrice]);

  return (
    <div className="price-container">
      <h4 className="price-title">Price:</h4>
      <div className="inputs-container">
        <label className="price-input-label">
          min:
          <input
            type="number"
            className="price-input min-price"
            id="min-price"
            value={min}
            onChange={handleChange}
          />
        </label>
        <label className="price-input-label">
          max:
          <input
            type="number"
            className="price-input max-price"
            id="max-price"
            value={max}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
};

PriceInput.propTypes = {
  setValue: PropTypes.func.isRequired,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
};

export default PriceInput;

import PropTypes from "prop-types";
const SortInput = ({ id, setValue, value, setUserPrice, name }) => {
  const handleOptionChange = (event) => {
    setValue(+event.target.value);
    setUserPrice(true);
  };

  const handleClick = () => {
    setValue(null);
    setUserPrice(true);
  };

  const type = name[0].toUpperCase() + name.slice(1);

  return (
    <div className="sort-container">
      <h4 className="title">Sort {type}</h4>
      <div className="input-container">
        <input
          className="sort-input lower"
          value="1"
          onChange={handleOptionChange}
          checked={value === 1}
          type="checkbox"
          id={`${id}-asc`}
        />
        <label htmlFor={`${id}-asc`}>Higher first</label>
      </div>
      <div className="input-container">
        <input
          className="sort-input lower"
          value="0"
          onChange={handleOptionChange}
          checked={value === 0}
          type="checkbox"
          id={`${id}-desc`}
        />
        <label htmlFor={`${id}-desc`}>Lower First</label>
      </div>
      <button onClick={handleClick} className="reset-button">
        reset
      </button>
    </div>
  );
};
SortInput.propTypes = {
  id: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.number,
  setUserPrice: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
export default SortInput;

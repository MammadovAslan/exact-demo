import PropTypes from "prop-types";
import Select from "react-select";

const Dropdown = ({ options, placeholder, setValue, property }) => {
  const handleSelectChange = (selectedOption) => {
    const selectedValue = selectedOption.map((option) => {
      return isNaN(+option.value) ? option.value : +option.value;
    });

    setValue((prev) => ({ ...prev, [property]: selectedValue }));
  };

  return (
    <label className="select-label">
      {placeholder}
      <Select
        options={options?.length > 0 && options.map((option) => ({ value: option, label: option }))}
        placeholder={placeholder}
        onChange={handleSelectChange}
        isMulti
      />
    </label>
  );
};

Dropdown.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  placeholder: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
};

export default Dropdown;

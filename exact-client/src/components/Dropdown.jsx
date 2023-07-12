import PropTypes from "prop-types";
import Select from "react-select";

const Dropdown = ({ options, placeholder, setValue, property, multiSelect }) => {
  const handleSelectChange = (selectedOption) => {
    let selectedValue;

    if (Array.isArray(selectedOption)) {
      selectedValue = selectedOption.map((option) => {
        return isNaN(+option.value) ? option.value : +option.value;
      });
    } else {
      selectedValue = selectedOption.value;
    }

    setValue((prev) => ({ ...prev, [property]: selectedValue }));
  };

  return (
    <label className="select-label">
      {placeholder}
      <Select
        isDisabled={options?.length === 0 || !options}
        options={options?.length > 0 && options.map((option) => ({ value: option, label: option }))}
        placeholder={placeholder}
        onChange={handleSelectChange}
        isMulti={multiSelect}
      />
    </label>
  );
};

Dropdown.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]),
  placeholder: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
  multiSelect: PropTypes.bool,
};

export default Dropdown;

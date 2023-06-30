import PropTypes from "prop-types";
import Select from "react-select";

const Dropdown = ({ options, placeholder, setValue }) => {
  const handleSelectChange = (selectedOption) => {
    const selectedValue = selectedOption.map((option) => {
      return isNaN(+option.value) ? option.value : +option.value;
    });

    setValue(selectedValue);
  };

  return (
    <label className="select-label">
      {placeholder}
      <Select
        options={options.map((option) => ({ value: option, label: option }))}
        placeholder={placeholder}
        onChange={handleSelectChange}
        isMulti
      />
    </label>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Dropdown;

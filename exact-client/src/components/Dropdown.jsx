import PropTypes from "prop-types";
import Select from "react-select";

const Dropdown = ({ options, placeholder }) => {
  return (
    <Select
      options={options.map((option) => ({ value: option, label: option }))}
      placeholder={placeholder}
    />
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Dropdown;

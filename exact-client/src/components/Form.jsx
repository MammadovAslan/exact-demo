import Dropdown from "./Dropdown";
import data from "../utils/data.json";

const getProperty = (property) => {
  return [
    ...new Set(
      data.data
        .map((item) => item[property].toString())
        .sort((a, b) => {
          return a - b;
        })
    ),
  ];
};

const brands = getProperty("brand");
const widthOptions = getProperty("width");
const aspectRatioOptions = getProperty("aspectRatio");

const Form = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <Dropdown options={brands} placeholder="Brand" />
      <Dropdown options={widthOptions} placeholder="Width" />
      <Dropdown options={aspectRatioOptions} placeholder="Ratio" />
    </form>
  );
};

export default Form;

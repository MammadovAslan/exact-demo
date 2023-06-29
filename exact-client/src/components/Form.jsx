import Dropdown from "./Dropdown";
import data from "../utils/data.json";

const getProperty = (property) => {
  return [...new Set(data.data.map((item) => item[property].toString()))];
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
      <Dropdown options={brands} placeholder="Select a brand" />
      <Dropdown options={widthOptions} placeholder="Select a width" />
      <Dropdown options={aspectRatioOptions} placeholder="Select an aspect ratio" />
    </form>
  );
};

export default Form;

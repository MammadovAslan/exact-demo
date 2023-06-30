import { useState } from "react";
import Dropdown from "./Dropdown";
import getProperty from "../utils/getProperty";

const Form = () => {
  const brands = getProperty("brand");
  const widthOptions = getProperty("width");
  const aspectRatioOptions = getProperty("aspectRatio");
  const rimDiameter = getProperty("rimDiameter");

  const [brand, setBrand] = useState([]);
  const [width, setWidth] = useState([]);
  const [ratio, setRatio] = useState([]);
  const [diameter, setDiameter] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    //TODO should make POST request to axiosInstance
    const queries = {
      brand,
      width,
      ratio,
      diameter,
    }

    console.log(queries);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="selects-container">
        <Dropdown options={brands} placeholder="Brand" setValue={setBrand} />
        <Dropdown options={widthOptions} placeholder="Width" setValue={setWidth} />
        <Dropdown options={rimDiameter} placeholder="Diameter" setValue={setDiameter} />
        <Dropdown options={aspectRatioOptions} placeholder="Ratio" setValue={setRatio} />
      </div>
      <button className="submit-button">Search</button>
    </form>
  );
};

export default Form;

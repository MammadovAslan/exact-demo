import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
const Form = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState();

  const apiUrl = import.meta.env.VITE_API_URL;

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const queryObject = {};
    const query = value
      .split(",")
      .map((el) => el.trim())
      .forEach((el) => {
        const q = el.split(" ");
        queryObject[q[0]] = isNaN(+q[1]) ? q[1] : +q[1];
      });

    console.log(queryObject);
    getData(queryObject);
  };

  const getData = async (queries) => {
    try {
      const response = await axiosInstance.post("/endpoint", queries);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <input type="text" onChange={changeHandler} value={value} />
      <button className="submit-button">submit</button>
    </form>
  );
};

export default Form;

import Dropdown from "./Dropdown";

const brands = [
  "Michelin",
  "Continental",
  "Bridgestone",
  "Pirelli",
  "Goodyear",
  "Dunlop",
  "Yokohama",
  "Hankook",
  "Falken",
  "Toyo",
];

const widthOptions = ["205", "215", "225", "235", "245", "255", "265", "275", "285", "295"];

const aspectRatioOptions = ["30", "35", "40", "45", "50", "55", "60", "65", "70", "75"];

const Form = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <Dropdown options={brands} placeholder="Select a brand" />
      <Dropdown options={widthOptions} placeholder="Select a width" />
      <Dropdown options={aspectRatioOptions} placeholder="Select an aspect ratio" />
      {/* Add more Dropdown components for additional selects */}
    </form>
  );
};

export default Form;

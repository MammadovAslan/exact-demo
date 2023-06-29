import PropTypes from "prop-types";

const Product = ({
  img,
  price,
  name,
  description,
  width,
  aspectRatio,
  season,
  diameter,
  availabitity,
}) => {
  return (
    <div className="product">
      <img src={img} alt={name} className="tire-image" />
      <h1 className="price">${price}</h1>
      <h3 className="name"> {name}</h3>
      <div className="content">
        <p className="description">{description}</p>
        <div className="characteristics">
          <div className="tire-width">Width: {width}</div>
          <div className="tire-aspect-ratio">Aspect-ratio: {aspectRatio}</div>
          <div className="tire-season">Season type: {season}</div>
          <div className="tire-diameter">Rim Diameter: {diameter}</div>
          <div className="availability">Availability: {availabitity}</div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  season: PropTypes.string.isRequired,
  diameter: PropTypes.number.isRequired,
  availabitity: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Product;

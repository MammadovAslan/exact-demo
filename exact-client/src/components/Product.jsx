import PropTypes from "prop-types";

const Product = ({ image, price, model, width, aspectRatio, rimDiameter, brand, rating }) => {
  return (
    <div className="product">
      <img src={image} alt={model} className="tire-image" width="200px" height="200px" />
      <h1 className="price">{price}</h1>
      <h3 className="name">
        {" "}
        {brand} - {model}
      </h3>
      <span>{rating}</span>
      <div className="content">
        <div className="characteristics">
          <div className="tire-width">Width: {width}</div>
          <div className="tire-aspect-ratio">Aspect-ratio: {aspectRatio}</div>
          <div className="tire-diameter">Rim Diameter: {rimDiameter}</div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  aspectRatio: PropTypes.number.isRequired,
  brand: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  rimDiameter: PropTypes.number.isRequired,
};

export default Product;

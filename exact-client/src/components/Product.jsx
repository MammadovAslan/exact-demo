import PropTypes from "prop-types";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Product = ({ image, price, model, width, aspectRatio, rimDiameter, brand, rating }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="star-half" className="star half-filled" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-star-${i}`} className="star" />);
    }

    return stars;
  };
  return (
    <div className="product">
      <div className="image-container">
        <img src={image} alt={model} className="tire-image" width="200px" height="200px" />
      </div>
      <h1 className="price">{price}</h1>
      <h3 className="name">
        {" "}
        {brand} - {model}
      </h3>
      <div className="rating">
        <span className="rating-number">Rating: {rating}</span>
        <span className="rating-stars">{renderStars()}</span>
      </div>
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

import PropTypes from "prop-types";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Product = ({ image, price, model, brand, rating }) => {
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
        <img src={image} alt={model} className="tire-image" height="160px" loading="lazy" />
      </div>
      <p className="price">{price}</p>
      <p className="name">
        {" "}
        {brand} - {model}
      </p>
      <div className="rating">
        <span className="rating-stars">{renderStars()}</span>
        <span className="rating-number">{rating}</span>
      </div>
    </div>
  );
};

Product.propTypes = {
  brand: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Product;

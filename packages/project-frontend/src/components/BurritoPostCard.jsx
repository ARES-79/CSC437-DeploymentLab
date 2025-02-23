
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import "./BurritoPostCard.css";

const BurritoPostCard = ({ username, image, title, description, rating, price, location }) => {
  return (
    <li className="burrito-card">
      {/* User Section */}
      <div className="burrito-user">
        <div className="burrito-user-icon">
          <FontAwesomeIcon icon={faCircleUser} />
        </div>
        <span className="burrito-username">{username}</span>
      </div>

      <img src={image} alt={title} className="burrito-image" />

      <h2 className="burrito-title">{title}</h2>

      {/* FontAwesome Star Rating */}
      <div className="burrito-rating">
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={i < rating ? solidStar : regularStar} // Solid for filled stars, regular for empty
            className={`burrito-star ${i < rating ? "filled" : ""}`}
          />
        ))}
        <span className="burrito-rating-text">{rating}/5</span>
      </div>

      <p className="burrito-description">{description}</p>

      <div className="burrito-details">
        {price && <span className="burrito-price">${price}</span>}
        <span className="burrito-location">{location}</span>
      </div>
    </li>
  );
};

export default BurritoPostCard;



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "./BurritoPostCard.css";
import { Link } from 'react-router';

const BurritoPostCard = ({ username, profileImage, image, title, description, rating, price, location }) => {
  return (
    <li className="burrito-card">
      {/* User Section */}
      <Link to={`/profiles/${username}`} className="user">
        <div>
          {profileImage ? (
            <img src={profileImage} alt={`${username}'s profile`} className="user-icon" />
          ) : (
            <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
          )}
        </div>
        <span className="username">{username}</span>
      </Link>

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


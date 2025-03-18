
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "./BurritoPostCard.css";
import { Link } from 'react-router';

//post should be PostFromAPI
const BurritoPostCard = ({ post, currentUserId, expandedContent }) => {
  
  const { createdBy, image, title, description, type, rating, price, location, restaurant, ingredients } = post;
  const { _id: userId, username, profilePicture} = createdBy;
  const userProfileLink = userId === currentUserId
    ? "/profile"  // If the post's userId is the current user's, link to /profile
    : `/profiles/${userId}`; 
  
  return (
    <li className="burrito-card">
      {/* User Section */}
      <Link to={userProfileLink} className="user" state={{ username: username }}>
        <div>
          {profilePicture ? (
            <img src={profilePicture} alt={`${username}'s profile`} className="user-icon" />
          ) : (
            <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
          )}
        </div>
        <span className="username">{username}</span>
      </Link>

      <Link to={`/posts/${post._id}`}>     
      <img src={image} alt={title} className={`burrito-image expanded-${expandedContent}`}/>

      <h2 className={`burrito-title expanded-${expandedContent}`}>{title}</h2>

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

      <p className={expandedContent ? "burrito-description" : "burrito-description-clamped"}>
        {description}</p>

      <div className="burrito-details">
        <span className="burrito-price">{price ? `$${price}` : ""}</span>
        <span className="burrito-location">{type === "purchased" ? location: "Homemade"}</span>
      </div>

      {expandedContent && (
            <div className="expanded-content">
              {restaurant && <p className="burrito-restaurant">Restaurant: {restaurant}</p>}
              {ingredients && (
                <p className="burrito-ingredients">
                  Ingredients: {ingredients.join(", ")}
                </p>
              )}
            </div>
          )}

      </Link>
    </li>
  );
};

export default BurritoPostCard;


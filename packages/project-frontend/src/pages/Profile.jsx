import React, { useState } from "react";
import "./Profile.css";
import { usePostFetching } from "../utils/usePostFetching.js";
import { PostGallery } from './PostGallery';

const ProfilePage = ({ user, updateUser, isDarkMode, handleDarkModeToggle }) => {
  const { isLoading, fetchedPosts } = usePostFetching("", user.userId);
  // State for managing edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to hold edited values
  const [newUsername, setNewUsername] = useState(user.username);
  const [newLocation, setNewLocation] = useState(user.location);

  // Function to toggle edit mode and save changes
  const toggleEdit = () => {
    if (isEditing) {
      updateUser({ username: newUsername, location: newLocation });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-container">
        <h2 className="header"> Profile Info </h2>
        
      {/* Profile Header */}
      <div className="profile-header">
        <img src={user.profilePicture} alt="Profile" className="profile-picture rounded-full" />
        <h2>
          {isEditing ? (
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="username-input"
            />
          ) : (
            <p>{user.username}</p>
          )}
        </h2>
      </div>

      {/* Location Section */}
      <div className="profile-location">
        <p>Location</p>
        {isEditing ? (
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="location-input"
          />
        ) : (
          <p>{user.location}</p>
        )}
      </div>

      {/* Edit/Save Button */}
      <div className="save-changes">
        <button onClick={toggleEdit}>{isEditing ? "Save Changes" : "Edit Profile"}</button>
      </div>

      <label>
        <input id="dm-checkBox" type="checkbox" autoComplete="off"
        checked={isDarkMode}
        onChange={handleDarkModeToggle} />
        Dark mode
      </label>

      <PostGallery header="Your Posts" isLoading={isLoading} fetchedPosts={fetchedPosts} />

    </div>    
  );
};

export default ProfilePage;

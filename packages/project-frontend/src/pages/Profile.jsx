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
        <>
            <h2 className="header"> Profile Info </h2>

            <div className="profile-container">
            <img src={user.profilePicture} alt="Profile" className="profile-picture rounded-full" />

            <div className="profile-info">
                <dl className="info-grid">
                <dt>Username</dt>
                <dd>
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
                </dd>
                <dt>Location</dt>
                <dd>
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
                </dd>
                </dl>


                <div className="options">

                    <label>
                        <input id="dm-checkBox" type="checkbox" autoComplete="off"
                            checked={isDarkMode}
                            onChange={handleDarkModeToggle} />
                        Dark mode
                    </label>

                    {/* Edit/Save Button */}
                    <button onClick={toggleEdit}>{isEditing ? "Save Changes" : "Edit Profile"}</button>

                </div>
                </div>
            </div>

            <PostGallery header="Your Posts" isLoading={isLoading} fetchedPosts={fetchedPosts} />

        </>
    );
};

export default ProfilePage;

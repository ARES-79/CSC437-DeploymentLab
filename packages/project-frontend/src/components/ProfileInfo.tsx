import React, { useState } from "react";
import './ProfileInfo.css';
import { useImageGeneration } from "../utils/useImageGeneration";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Loading } from "./Loading";
import { profileInfoProps } from "../types/profileProps";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const ProfileInfo = ({ user, updateUser, isDarkMode, handleDarkModeToggle }: profileInfoProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(user.username);
    const [newLocation, setNewLocation] = useState(user.location);

    // For profile image generation
    const { generateImage, imageUrl, setImageUrl, isLoading } = useImageGeneration(200, 200, user.profilePicture);

    const toggleEdit = () => {
        if (isEditing) {
            updateUser({ username: newUsername, location: newLocation, profilePicture: imageUrl });
        }
        setIsEditing(!isEditing);
    };

    // console.log("profilePicture", user.profilePicture);
    // console.log("imageUrl", imageUrl);

    const handleProfilePictureClick = () => {
        if (isEditing) {
            // Generate a new image only when in editing mode
            generateImage(user.username);
        }
    };

    return (
        <>
            <h2 className="header">Profile Info</h2>
            <div className="profile-container">
                <div className="profile-picture-container">
                    {
                        (imageUrl || user.profilePicture) ? (
                            <img
                                src={imageUrl || user.profilePicture}
                                alt="Profile"
                                className="profile-picture rounded-full"
                                onClick={handleProfilePictureClick} // Click to change profile picture only in editing mode
                            />
                        ) : (
                            <FontAwesomeIcon icon={faCircleUser} className="profile-picture rounded-full"
                                onClick={handleProfilePictureClick}
                                tabIndex={0} // Make it focusable
                                role="button" />
                        )
                    }
                    {/* <img 
                    src={imageUrl || user.profilePicture} 
                    alt="Profile" 
                    className="profile-picture rounded-full" 
                    onClick={handleProfilePictureClick} // Click to change profile picture only in editing mode
                /> */}
                    {isEditing && (
                        <div className="overlay">
                            {isLoading ? <Loading /> : <div className="overlay-text">
                                <FontAwesomeIcon icon={faPen} />
                                <p>Click to change</p>
                            </div>}

                        </div>
                    )}
                </div>

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
                            <input
                                id="dm-checkBox"
                                type="checkbox"
                                autoComplete="off"
                                checked={isDarkMode}
                                onChange={handleDarkModeToggle}
                            />
                            Dark mode
                        </label>

                        <button onClick={toggleEdit}>
                            {isEditing ? "Save Changes" : "Edit Profile"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileInfo;

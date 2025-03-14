import React, { useState, useRef } from "react";
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
    const [imageUrl, setImageUrl] = useState(user.profilePicture);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const toggleEdit = () => {
        if (isEditing) {
            updateUser({ username: newUsername, location: newLocation, profilePicture: imageUrl });
        }
        setIsEditing(!isEditing);
    };

    const handleProfilePictureClick = () => {
        if (isEditing) {
            fileInputRef.current?.click(); // Open file explorer only in editing mode
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const files = event.target.files; // Fix type error
        if (files && files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setImageUrl(url);
            updateUser({ ...user, profilePicture: url }); // Update user profile picture
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
                    {isEditing && (
                        <div className="overlay">
                            <div className="overlay-text">
                                <FontAwesomeIcon icon={faPen} />
                                <p>Click to change</p>
                            </div>
                            <label htmlFor="profileImageUpload" className="sr-only" >Choose an image file as your profile picture and preview it.</label>
                            <input
                                ref={fileInputRef} // Hidden file input
                                id="profileImageUpload"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleFileChange} // Handle file selection
                            />
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

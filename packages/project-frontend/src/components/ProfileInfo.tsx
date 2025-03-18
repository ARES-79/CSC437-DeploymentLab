import React, { useState, useRef } from "react";
import './ProfileInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Loading } from "./Loading";
import { profileInfoProps } from "../types/profileProps";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { UpdateUserData } from "../types/user";
import { submitUpdatedInfo } from "../utils/sendUpdateUserInfoRequest";

const ProfileInfo = ({ user, updateUser, isDarkMode, handleDarkModeToggle, authToken }: profileInfoProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [newUsername, setNewUsername] = useState(user.username);
    const [newLocation, setNewLocation] = useState(user.location);
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState(user.profilePicture);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const resetFields = () => {
        setNewUsername(user.username);
        setNewLocation(user.location);
        setImageUrl(user.profilePicture);
        setImageFile(null);
    }

    const toggleEdit = async () => {
        setError("");
        if (isEditing) {

            const updatedFields: Partial<UpdateUserData> = {};

            if (newUsername !== user.username) {
                updatedFields.username = newUsername;
            }

            if (newLocation !== user.location) {
                updatedFields.location = newLocation;
            }

            if (imageUrl !== user.profilePicture) {
                updatedFields.profilePicture = imageUrl;
            }

            if (Object.keys(updatedFields).length > 0) {
                const response = await submitUpdatedInfo(user._id, authToken, updatedFields, imageFile || undefined, setImageFile);

                if (response.status != 'success') {
                    setError(response.message);
                    resetFields();
                } else {
                    updateUser(updatedFields);
                }
            }

        }
        setIsEditing(!isEditing);
    };

    const handleProfilePictureClick = () => {
        if (isEditing) {
            fileInputRef.current?.click(); // Open file explorer only in editing mode
        }
    };

    function readAsDataURL(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => {
                // TypeScript will infer the correct type for `result` here.
                resolve(fr.result as string); // Ensures it's a string
            };
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
        });
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const inputElement = e.target;
        if (inputElement.files && inputElement.files[0]) {
            const fileObj = inputElement.files[0];
            setImageFile(fileObj);

            // Pass the file object to `readAsDataURL` and set the image URL
            readAsDataURL(fileObj).then((newImgSrc) => {
                setImageUrl(newImgSrc);  // Assuming `setImageUrl` is a state setter
            }).catch((err) => {
                console.error('Error reading file:', err);
            });
        } else {
            console.error('No file selected.');
        }
    }

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
                        <dt><label htmlFor="username">Username</label></dt>
                        <dd>
                            <input
                                id="username"
                                type="text"
                                value={newUsername}
                                autoComplete="username"
                                onChange={(e) => setNewUsername(e.target.value)}
                                className={`username-input ${isEditing ? "enabled" : "disabled"}`}
                                disabled={!isEditing}
                            />
                        </dd>
                        <dt><label htmlFor="location">Location</label></dt>
                        <dd>
                            <input
                                id="location"
                                type="text"
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                                className={`location-input ${isEditing ? "enabled" : "disabled"}`}
                                disabled={!isEditing}
                            />
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
                    {error && <p className={`profileError`}>{error}</p>}
                </div>
            </div>
        </>
    );
};

export default ProfileInfo;

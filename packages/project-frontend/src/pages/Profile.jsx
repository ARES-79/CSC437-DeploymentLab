import React, { useState } from "react";
import "./Profile.css";
import { usePostFetching } from "../utils/usePostFetching.js";
import { PostGallery } from './PostGallery';
import ProfileInfo from "../components/ProfileInfo";

const ProfilePage = ({ user, updateUser, isDarkMode, handleDarkModeToggle }) => {
    const { isLoading, fetchedPosts } = usePostFetching("", user.userId);

    return (
        <>
            <h2 className="header">Profile Info</h2>
            
            {/* Extracted profile info component */}
            <ProfileInfo
                user={user}
                updateUser={updateUser}
                isDarkMode={isDarkMode}
                handleDarkModeToggle={handleDarkModeToggle}
            />

            <PostGallery header="Your Posts" currentUserId={user.userId} isLoading={isLoading} fetchedPosts={fetchedPosts} />

        </>
    );
};

export default ProfilePage;

import { usePostFetching } from "../utils/usePostFetching.js";
import { PostGallery } from './PostGallery.js';
import { useParams, useLocation } from 'react-router';
import ProfileInfo from "../components/ProfileInfo.js";
import { profilePageProps } from "../types/profileProps.js";


const ProfilePage = ({ user: currentUser, updateUser, isDarkMode, handleDarkModeToggle, authToken }: profilePageProps) => {
    const { userId } = useParams();
    const location = useLocation();
    const isCurrentUser = userId === undefined;
    const { isLoading, fetchedPosts } = usePostFetching("", isCurrentUser ? currentUser._id : userId, authToken);
    const username = location.state?.username || "Unknown User";

    return (
        <>
            {/* Only show ProfileInfo if the profile belongs to the logged-in user
                and we have all the appropriate props */}
            {isCurrentUser && updateUser !== undefined && isDarkMode !== undefined && handleDarkModeToggle !== undefined && (
                <ProfileInfo
                    user={currentUser}
                    updateUser={updateUser}
                    isDarkMode={isDarkMode}
                    handleDarkModeToggle={handleDarkModeToggle}
                    authToken={authToken}
                />
            )}

            <PostGallery header={isCurrentUser ? "My Posts" : `${username}\'s Posts`}
                currentUserId={currentUser._id}
                isLoading={isLoading} fetchedPosts={fetchedPosts}
                expandedContent={false} />

        </>
    );
};

export default ProfilePage;

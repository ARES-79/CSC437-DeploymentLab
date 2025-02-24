import { usePostFetching } from "../utils/usePostFetching.js";
import { PostGallery } from './PostGallery';
import { useParams, useLocation } from 'react-router';
import ProfileInfo from "../components/ProfileInfo";

const ProfilePage = ({ user: currentUser, updateUser, isDarkMode, handleDarkModeToggle }) => {
    const { userId } = useParams();
    const location = useLocation();
    const isCurrentUser = userId === undefined;
    const { isLoading, fetchedPosts } = usePostFetching("", isCurrentUser ? currentUser.userId : userId);
    const username = location.state?.username || "Unknown User";

    return (
        <>
            {/* Only show ProfileInfo if the profile belongs to the logged-in user */}
            {isCurrentUser && (
                <ProfileInfo
                    user={currentUser}
                    updateUser={updateUser}
                    isDarkMode={isDarkMode}
                    handleDarkModeToggle={handleDarkModeToggle}
                />
            )}

            <PostGallery header={isCurrentUser ? "My Posts" : `${username}\'s Posts`}
                currentUserId={currentUser.userId}
                isLoading={isLoading} fetchedPosts={fetchedPosts} />

        </>
    );
};

export default ProfilePage;

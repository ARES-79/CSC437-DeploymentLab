import { usePostFetching } from "../utils/usePostFetching.js";
import { PostGallery } from './PostGallery.js';
import { useParams } from 'react-router';

interface PostDetailsProps {
    currentUserId: string;
    authToken: string;
}

export function PostDetails ({currentUserId, authToken} : PostDetailsProps) {
    const { postId } = useParams<{ postId: string }>();
    const { isLoading, fetchedPosts } = usePostFetching(postId || "", "", authToken);

    return (
        <>
            <PostGallery isLoading={isLoading} fetchedPosts={fetchedPosts} 
                expandedContent={true} currentUserId={currentUserId}/>

        </>
    );
};

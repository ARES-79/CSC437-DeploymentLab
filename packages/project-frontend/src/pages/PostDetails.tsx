import { usePostFetching } from "../utils/usePostFetching.js";
import { PostGallery } from './PostGallery.js';
import { useParams } from 'react-router';

interface PostDetailsProps {
    currentUserId: string;
}

export function PostDetails ({currentUserId} : PostDetailsProps) {
    const { postId } = useParams<{ postId: string }>();
    const { isLoading, fetchedPosts } = usePostFetching(postId || "", "");

    return (
        <>
            <PostGallery isLoading={isLoading} fetchedPosts={fetchedPosts} 
                expandedContent={true} currentUserId={currentUserId}/>

        </>
    );
};

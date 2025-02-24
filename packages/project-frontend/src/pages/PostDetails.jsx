import { usePostFetching } from "../utils/usePostFetching.js";
import { PostGallery } from './PostGallery';
import { useParams, useLocation } from 'react-router';

export const PostDetails = () => {
    const { postId } = useParams();
    const { isLoading, fetchedPosts } = usePostFetching(postId, "");

    return (
        <>
            <PostGallery isLoading={isLoading} fetchedPosts={fetchedPosts} 
                expandedContent={true}/>

        </>
    );
};

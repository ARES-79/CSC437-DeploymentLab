import './PostGallery.css'
import BurritoPostCard from '../components/BurritoPostCard';
import { Loading } from '../components/Loading';
import { Post } from '../types/post';

interface PostGalleryProps {
    header?: string;
    currentUserId: string;
    isLoading: boolean;
    fetchedPosts: Post[];
    expandedContent: boolean;
}

export function PostGallery({ header, currentUserId, isLoading, fetchedPosts, expandedContent }: PostGalleryProps) {

    const postElements = fetchedPosts.map((post) => (
            <BurritoPostCard 
                key={post.id}
                post={post}
                currentUserId={currentUserId}
                expandedContent={expandedContent}
            />
    ));
    return (
        <>
            <h2 className="header"> {header} </h2>
            {isLoading && <Loading/>}
            <ul className="cards">
                {postElements}
            </ul>
        </>
    );
}
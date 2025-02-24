import { Link } from 'react-router';
import './PostGallery.css'
import BurritoPostCard from '../components/BurritoPostCard';

export function PostGallery({ header, currentUserId, isLoading, fetchedPosts, expandedContent }) {

    const postElements = fetchedPosts.map((post) => (
        /* need to change when I add routing */
        // <Link key={post.id} to={`/posts/${post.id}`}> 
            <BurritoPostCard 
                key={post.id}
                post={post}
                currentUserId={currentUserId}
                expandedContent={expandedContent}
            />
        // </Link>
    ));
    return (
        <>
            <h2 className="header"> {header} </h2>
            {isLoading && "Loading..."}
            <ul className="cards">
                {postElements}
            </ul>
        </>
    );
}
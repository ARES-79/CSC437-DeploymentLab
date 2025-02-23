import { Link } from 'react-router';
import './PostGallery.css'
import BurritoPostCard from '../components/BurritoPostCard';

export function PostGallery({ isLoading, fetchedPosts }) {

    const postElements = fetchedPosts.map((post) => (
        /* need to change when I add routing */
        <Link key={post.id} to={`/posts/${post.id}`}> 
            <BurritoPostCard 
                username={post.username}
                image={post.image}
                title={post.title}
                description={post.description}
                rating={post.rating}
                price={post.price}
                location={post.location}
            />
        </Link>
    ));
    return (
        <>
            <h2 className="header"> Burrito Gallery </h2>
            {isLoading && "Loading..."}
            <ul className="cards">
                {postElements}
            </ul>
        </>
    );
}
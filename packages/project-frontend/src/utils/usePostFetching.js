import { useEffect, useState } from "react";
import sampleBurrito1 from '../assets/exBurritoImages/burrito1.jpeg';
import sampleBurrito2 from '../assets/exBurritoImages/burrito2.jpeg';
import sampleBurrito3 from '../assets/exBurritoImages/burrito3.jpeg';

const POSTS = [
    {
        id: "0",
        username: "username_1",
        image: sampleBurrito1,
        title: "Delicious Steak Burrito",
        description: "A tasty steak burrito with fresh ingredients and homemade salsa.",
        rating: "4",
        price: "8.99",
        location: "San Diego, CA"
    },
    {
        id: "1",
        username: "username_2",
        image: sampleBurrito2,
        title: "Delicious Steak Burrito",
        description: "A tasty steak burrito with fresh ingredients and homemade salsa.",
        rating: "3",
        price: "10.99",
        location: "San Diego, CA"
    },
    {
        id: "2",
        username: "username_2",
        image: sampleBurrito3,
        title: "Delicious Steak Burrito",
        description: "A tasty steak burrito with fresh ingredients and homemade salsa.",
        rating: "4",
        location: "Homemade"
    },
    {
        id: "3",
        username: "username_1",
        image: sampleBurrito1,
        title: "Delicious Steak Burrito",
        description: "A tasty steak burrito with fresh ingredients and homemade salsa.",
        rating: "2",
        price: "8.99",
        location: "San Diego, CA"
    },
    {
        id: "4",
        username: "username_1",
        image: sampleBurrito1,
        title: "Delicious Steak Burrito",
        description: "A tasty steak burrito with fresh ingredients and homemade salsa.",
        rating: "5",
        location: "Homemade"
    }
];

/**
 * Fetches posts on component mount.  Returns an object with two properties: isLoading and fetchedPosts, which will be
 * an array of PostData
 *
 * @param postId {string} the image ID to fetch, or all of them if empty string
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{isLoading: boolean, fetchedPosts}} fetch state and data
 */
export function usePostFetching(postId, delay=1000) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedPosts, setFetchedPosts] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            if (postId === "") {
                setFetchedPosts(POSTS);
            } else {
                setFetchedPosts(POSTS.filter((post) => post.id === postId));
            }
            setIsLoading(false);
        }, delay);
    }, [postId]);

    return { isLoading, fetchedPosts: fetchedPosts };
}

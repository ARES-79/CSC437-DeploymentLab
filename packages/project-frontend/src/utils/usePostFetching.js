import { useEffect, useState } from "react";
import sampleBurrito1 from '../assets/exBurritoImages/burrito1.jpeg';
import sampleBurrito2 from '../assets/exBurritoImages/burrito2.jpeg';
import sampleBurrito3 from '../assets/exBurritoImages/burrito3.jpeg';

const POSTS = [
    {
        id: "0",
        userId: "0",
        username: "username_1",
        image: sampleBurrito1,
        title: "Delicious Steak Burrito",
        description: "A tasty steak burrito with fresh ingredients and homemade salsa. A tasty steak burrito with fresh ingredients and homemade salsa. A tasty steak burrito with fresh ingredients and homemade salsa. A tasty steak burrito with fresh ingredients and homemade salsa.A tasty steak burrito with fresh ingredients and homemade salsa.A tasty steak burrito with fresh ingredients and homemade salsa.A tasty steak burrito with fresh ingredients and homemade salsa.A tasty steak burrito with fresh ingredients and homemade salsa.A tasty steak burrito with fresh ingredients and homemade salsa.A tasty steak burrito with fresh ingredients and homemade salsa.A tasty steak burrito with fresh ingredients and homemade salsa.A tasty steak burrito with fresh ingredients and homemade salsa.A tasty steak burrito with fresh ingredients and homemade salsa.A tasty steak burrito with fresh ingredients and homemade salsa.A tasty steak burrito with fresh ingredients and homemade salsa.A tasty steak burrito with fresh ingredients and homemade salsa.",
        type: "purchased",
        rating: "4",
        price: "8.99",
        location: "San Diego, CA",
        restaurant: "Restaurant ABC"
    },
    {
        id: "1",
        userId: "1",
        username: "username_2",
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg',
        image: sampleBurrito2,
        title: "Delicious Steak Burrito",
        description: "A tasty steak burrito with fresh ingredients and homemade salsa.",
        type: "purchased",
        rating: "3",
        price: "10.99",
        location: "San Diego, CA",
        restaurant: "Restaurant 123"
    },
    {
        id: "2",
        userId: "1",
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg',
        username: "username_2",
        image: sampleBurrito3,
        title: "Delicious Steak Burrito",
        ingredients: ["tomato", "lettuce", "cheese", "beef"],
        type: "homemade",
        description: "A tasty steak burrito with fresh ingredients and homemade salsa.",
        rating: "4"
    },
    {
        id: "3",
        userId: "0",
        username: "username_1",
        image: sampleBurrito1,
        title: "Delicious Steak Burrito",
        description: "A tasty steak burrito with fresh ingredients and homemade salsa.",
        type: "purchased",
        ingredients: ["avocado", "sour cream", "chicken", "beans"],
        rating: "2",
        price: "8.99",
        location: "San Diego, CA",
        restaurant: "Restaurant 123"
    },
    {
        id: "4",
        userId: "0",
        username: "username_1",
        image: sampleBurrito1,
        title: "Delicious Steak Burrito",
        description: "A tasty steak burrito with fresh ingredients and homemade salsa.",
        rating: "5",
        type: "homemade",
        ingredients: ["guacamole", "jalapenos", "onions"]
    }
];

/**
 * Fetches posts on component mount.  Returns an object with two properties: isLoading and fetchedPosts, which will be
 * an array of PostData
 *
 * @param postId {string} the image ID to fetch, or all of them if empty string
 * @param userId {string} the user ID to fetch associated posts, or all of them if empty string
 * 
 * only postId or userId should be present, postId takes presedence
 * 
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{isLoading: boolean, fetchedPosts}} fetch state and data
 */
export function usePostFetching(postId, userId, delay=1000) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedPosts, setFetchedPosts] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            if (postId === "" && userId === "") {
                setFetchedPosts(POSTS);
            } else if (postId !== "") {
                setFetchedPosts(POSTS.filter((post) => post.id === postId));
            } else {
                setFetchedPosts(POSTS.filter((post) => post.userId === userId));
            }
            setIsLoading(false);
        }, delay);
    }, [postId, userId]);

    return { isLoading, fetchedPosts: fetchedPosts };
}

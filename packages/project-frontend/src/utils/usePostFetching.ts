import { useEffect, useState } from "react";
import sampleBurrito1 from '../assets/exBurritoImages/burrito1.jpeg';
import sampleBurrito2 from '../assets/exBurritoImages/burrito2.jpeg';
import sampleBurrito3 from '../assets/exBurritoImages/burrito3.jpeg';
import { PostFromAPI } from "../types/post";

const POSTS: PostFromAPI[] = [
    {
        _id: "0",
        createdBy: {
            _id: "0",
            username: "username_1"
        },
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
        _id: "1",
        createdBy: {
            _id: "1",
            username: "username_2",
            profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg'
        },
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
        _id: "2",
        createdBy: {
            _id: "1",
            username: "username_2",
            profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg'
        },
        image: sampleBurrito3,
        title: "Delicious Steak Burrito",
        ingredients: ["tomato", "lettuce", "cheese", "beef"],
        type: "homemade",
        description: "A tasty steak burrito with fresh ingredients and homemade salsa.",
        rating: "4"
    },
    {
        _id: "3",
        createdBy: {
            _id: "0",
            username: "username_1"
        },
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
        _id: "4",
        createdBy: {
            _id: "0",
            username: "username_1"
        },
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
export function usePostFetching(postId: string, userId: string, authToken: string, delay = 1000) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedPosts, setFetchedPosts] = useState<PostFromAPI[]>([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let url = "/api/posts"; // Default URL

                if (postId) {
                    url = `/api/posts/${postId}`;
                } else if (userId) {
                    url = `/api/posts?createdBy=${encodeURIComponent(userId)}`;
                }
                const response = await fetch(url, {
                    method: 'GET', // Optional, since GET is default
                    headers: {
                        'Authorization': `Bearer ${authToken}`, // Replace with your actual token
                        'Content-Type': 'application/json' // Optional, depending on the API requirements
                    }
                });
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                    return;
                }
                const data = await response.json(); // Parse JSON data
                setFetchedPosts(data); // Update state with fetched data
            } catch (error) {
                console.error(`Could not get images: ${error}`);
                throw error;
            } finally {
                setIsLoading(false); // Set loading to false after fetching is complete
            }
        };
        // console.log("fetching posts from api");
        fetchPosts();
    }, [postId, userId, authToken]);

    return { isLoading, fetchedPosts };
}

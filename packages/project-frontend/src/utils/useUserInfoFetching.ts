import { useEffect, useState } from "react";
import { User } from "../types/user";

export function useUserInfoFetching(authToken: string) {
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [fetchedUser, setFetchedUser] = useState<User>({
    _id: '',
    username: '',
    location: '',
    darkMode: false,
    });
    useEffect(() => {
        const fetchPosts = async () => {
            try {

                console.log("token in useUserInfoFetching:", authToken);
                const response = await fetch("/api/user", {
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
                setFetchedUser(data); // Update state with fetched data
                console.log("fectched user:", data);
            } catch (error) {
                console.error(`Could not get User Info: ${error}`);
                throw error;
            } finally {
                setIsLoadingUser(false); // Set loading to false after fetching is complete
            }
        };
        // console.log("fetching posts from api");
        fetchPosts();
    }, [ authToken ]);

    return { isLoadingUser, fetchedUser, setFetchedUser };
}
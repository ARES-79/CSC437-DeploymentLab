import React from "react";
import { groceryFetcher } from "./groceryFetcher";
import { useEffect } from 'react';

export function useGroceryFetch(source) {
    const [groceryData, setGroceryData] = React.useState([
            {
                name: "test item",
                price: 12.3
            },
            {
                name: "test item 2",
                price: 0.5
            }
        ]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        
        let isStale = false; // Fresh variable for each effect run

        async function fetchData(url) {
            setError(null);
            setGroceryData([]);
            setIsLoading(true);

            try {
                console.log("fetching data from " + url);
                const data = await groceryFetcher.fetch(url);

                if (!isStale) {
                    setGroceryData(data);
                }
            } catch (error) {
                console.log("caught an error while fetching.");
                if (!isStale) {
                    setError(`Could not get products: ${error}`);
                }
            }
            if (!isStale) {
                setIsLoading(false);
            }
            console.log("finished fetch call.");
        }

        fetchData(source);
    
        return () => { isStale = true };
    }, [source]);

    return { groceryData, isLoading, error};
}
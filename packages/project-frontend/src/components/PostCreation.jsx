import React, { useState } from "react";
import "./PostCreation.css";
import { useImageGeneration } from "../utils/useImageGeneration";
import { Loading } from "./Loading";

const PostCreation = ({ user, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [image, setImage] = useState(null);
    const [ingredients, setIngredients] = useState("");
    const [type, setType] = useState("homemade"); // "homemade" or "purchased"
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState(user?.location || '');
    const [restaurant, setRestaurant] = useState("");
    const [error, setError] = useState("");
    const [imageCounter, setImageCounter] = useState(0);
    const placeholderImageText = `Your Image ${imageCounter}`;

    const { generateImage, imageUrl, setImageUrl, isLoading } = useImageGeneration(400, 500, undefined);
    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setImage(URL.createObjectURL(file)); // Preview Image
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            setError("Title and description are required.");
            return;
        }

        if (type === "purchased" && (!price.trim() || !location.trim() || !restaurant.trim())) {
            setError("Price, location, and restaurant are required for purchased burritos.");
            return;
        }

        setError("");

        const newPost = {
            //post id will have to be generated
            userId: user.userId,
            username: user.username,
            profileImage: user.profileImage,
            title,
            description,
            imageUrl,
            ingredients: ingredients.split(",").map(ingr => ingr.trim()), // Convert comma-separated ingredients to array
            type,
            ...(type === "purchased" && { price, location, restaurant }), // Include only if purchased
        };

        onSubmit(newPost); // Call function to handle post submission
        setTitle("");
        setDescription("");
        setImageUrl(""); // This will reset the image to undefined
        setImageCounter(imageCounter + 1);
        setIngredients("");
        setPrice("");
        setLocation("");
        setRestaurant("");
        setType("homemade");
    };

    return (
        <div className="post-creation">
            <h2>Create a New Post</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="Title">Title:</label>
                <input
                    type="text"
                    id="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="Description">Description:</label>
                <textarea
                    id="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label htmlFor="Ingredients">Ingredients (comma-separated):</label>
                <textarea
                    type="text"
                    id="Ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="e.g. sausage, egg, potatoes"
                />

                <p>Burrito Type:</p>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            id="Homemade"
                            value="homemade"
                            checked={type === "homemade"}
                            onChange={() => setType("homemade")}
                        />
                        Homemade
                    </label>
                    <label>
                        <input
                            type="radio"
                            id="Purchased"
                            value="purchased"
                            checked={type === "purchased"}
                            onChange={() => setType("purchased")}
                        />
                        Purchased
                    </label>
                </div>

                {type === "purchased" && (
                    <>
                        <label htmlFor="Price">Price ($):</label>
                        <input
                            type="number"
                            id="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min="0"
                            required={type === "purchased"}
                        />

                        <label  htmlFor="Location">Location:</label>
                        <input
                            type="text"
                            id="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required={type === "purchased"}
                        />

                        <label htmlFor="Restaurant">Restaurant Name:</label>
                        <input
                            type="text"
                            id="Restaurant"
                            value={restaurant}
                            onChange={(e) => setRestaurant(e.target.value)}
                            required={type === "purchased"}
                        />
                    </>
                )}

                <label htmlFor="Upload">Upload Image:</label>
                {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
                <button id="Upload" type="button" 
                    onClick={() => generateImage(placeholderImageText)} // Trigger image generation on button click
                >
                    Upload File
                </button>
                {isLoading && <Loading/>}
                <div className="image-preview-holder">
                    {imageUrl && <img src={imageUrl} alt="Preview" className="image-preview" />}
                </div>

                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default PostCreation;

import React, { useState } from "react";
import "./PostCreation.css";
import { useImageGeneration } from "../utils/useImageGeneration";

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
    const  placeholderImageText = `Your Image ${imageCounter}`;

    const { generateImage, imageUrl, setImageUrl } = useImageGeneration(400, 500, undefined);

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
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label>Ingredients (comma-separated):</label>
                <textarea
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="e.g. sausage, egg, potatoes"
                />

                <label>Burrito Type:</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value="homemade"
                            checked={type === "homemade"}
                            onChange={() => setType("homemade")}
                        />
                        Homemade
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="purchased"
                            checked={type === "purchased"}
                            onChange={() => setType("purchased")}
                        />
                        Purchased
                    </label>
                </div>

                {type === "purchased" && (
                    <>
                        <label>Price ($):</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min="0"
                            required={type === "purchased"}
                        />

                        <label>Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required={type === "purchased"}
                        />

                        <label>Restaurant Name:</label>
                        <input
                            type="text"
                            value={restaurant}
                            onChange={(e) => setRestaurant(e.target.value)}
                            required={type === "purchased"}
                        />
                    </>
                )}

                <label>Upload Image:</label>
                {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
                <button type="button"
                    onClick={() => generateImage(placeholderImageText)} // Trigger image generation on button click
                >
                    Upload File
                </button>
                <div className="image-preview-holder">
                    {imageUrl && <img src={imageUrl} alt="Preview" className="image-preview" />}
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default PostCreation;

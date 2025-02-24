import React, { useState } from "react";
import "./PostCreation.css";

const PostCreation = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState("");
    const [type, setType] = useState("homemade"); // "homemade" or "purchased"
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const [error, setError] = useState("");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Preview Image
        }
    };

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
            title,
            description,
            image,
            tags: tags.split(",").map(tag => tag.trim()), // Convert comma-separated tags to array
            type,
            ...(type === "purchased" && { price, location, restaurant }), // Include only if purchased
        };

        onSubmit(newPost); // Call function to handle post submission
        setTitle("");
        setDescription("");
        setImage(null);
        setTags("");
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
                <input 
                    type="text" 
                    value={tags} 
                    onChange={(e) => setTags(e.target.value)} 
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
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                
                {image && <img src={image} alt="Preview" className="image-preview" />}

                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default PostCreation;

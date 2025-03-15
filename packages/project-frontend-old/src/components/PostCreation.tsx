import React, { useState } from "react";
// import { useActionState } from "react";
import "./PostCreation.css";
import { NewPostSubmission } from "../types/post";
import { User } from "../types/user";
import { ImageUploader } from "./ImageUploader";


const PostCreation = ({ user, onSubmit, authToken }: { user: User, onSubmit: (post: NewPostSubmission) => void, authToken?: String }) => {
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [ingredients, setIngredients] = useState("");
    // const [rating, setRating] = useState<number | "">("");
    // const [type, setType] = useState<"purchased" | "homemade">("homemade"); // "homemade" or "purchased"
    // const [price, setPrice] = useState("");
    // const [location, setLocation] = useState(user?.location || '');
    // const [restaurant, setRestaurant] = useState("");

    const [error, setError] = useState("");
    const [imageSrc, setImageSrc] = useState<string>('');
    const [burritoType, setBurritoType] = useState<"homemade" | "purchased">("homemade");

    // const [result, submitAction, isPending] = useActionState(
    //     async (state: { type: string; message: string; } | null, formData: FormData) => {
    //         const title = (formData.get("Title") as string)?.trim() || "";
    //         const description = (formData.get("Description") as string)?.trim() || "";
    //         const rating = formData.get("Rating");
    //         const ingredients = formData.get("Ingredients");
    //         const type = formData.get("Type");
    //         const price = formData.get("Price");
    //         const location = formData.get("Location");
    //         const restaurant = formData.get("Restaurant");
    //         const image = formData.get("Image");

    //         if (!title || !description) {
    //             return {
    //                 type: "error",
    //                 message: "Title and description are required.",
    //             };
    //         }

    //         if (type === "purchased" && (!price || !location || !restaurant)) {
    //             return {
    //                 type: "error",
    //                 message: "Price, location, and restaurant are required for purchased burritos.",
    //             };
    //         }

    //         if (!(image as File)?.name) {
    //             return {
    //                 type: "error",
    //                 message: "Please upload an image before submitting.",
    //             };
    //         }

    //         try {
    //             const response = await fetch("/api/images", {
    //                 method: "POST",
    //                 body: formData,
    //                 headers: {
    //                     'Authorization': `Bearer ${authToken}`
    //                 }
    //             });
    //             if (!response.ok) {
    //                 return {
    //                     type: "error",
    //                     message: "`${response.status}: Error submitting the image.`",
    //                 };
    //             }
    //         } catch (error) { // Network error
    //             console.error(error);
    //             // Return an error message...
    //         }
    //         setImageSrc('');
    //         // const newPost = {
    //         //     createdBy: user._id,
    //         //     title,
    //         //     description,
    //         //     image: imageUrl,
    //         //     rating,
    //         //     ingredients: ingredients ? ingredients.split(",").map((i: string) => i.trim()) : [],
    //         //     type,
    //         //     ...(type === "purchased" && { price, location, restaurant }),
    //         // };

    //         // onSubmit(newPost);

    //         return { type: "success", message: "Post created successfully!" };
    //     }, null);

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (!title.trim() || !description.trim()) {
    //         setError("Title and description are required.");
    //         return;
    //     }

    //     if (type === "purchased" && (!price.trim() || !location.trim() || !restaurant.trim())) {
    //         setError("Price, location, and restaurant are required for purchased burritos.");
    //         return;
    //     }

    //     if (rating === "" || rating < 0 || rating > 5) {
    //         setError("Please provide a rating between 0 and 5.");
    //         return;
    //     }

    //     if (!imageSrc) {
    //         setError("Please upload an image before submitting.");
    //         return;
    //     }

    //     setError("");

    //     const newPost: NewPostSubmission = {
    //         //post id will have to be generated
    //         createdBy: user._id,
    //         title,
    //         description,
    //         image: imageSrc,
    //         rating: rating.toString(),
    //         ingredients: ingredients.split(",").map(ingr => ingr.trim()), // Convert comma-separated ingredients to array
    //         type,
    //         ...(type === "purchased" && { price, location, restaurant }), // Include only if purchased
    //     };

    //     onSubmit(newPost); // Call function to handle post submission

    //     setTitle("");
    //     setDescription("");
    //     setRating("");
    //     setIngredients("");
    //     setPrice("");
    //     setLocation("");
    //     setRestaurant("");
    //     setType("homemade");
    //     setImageSrc("");
    // };

    return (
        <div className="post-creation">
            <h2>Create a New Post</h2>
            {error && <p className="error">{error}</p>}
            {/* action={submitAction} */}
            <form >
                <label htmlFor="Title">Title:</label>
                <input
                    type="text"
                    id="Title"
                    name="title"
                    required
                />

                <label htmlFor="Description">Description:</label>
                <textarea
                    id="Description"
                    name="Description"
                    required
                />

                <label htmlFor="Rating">Rating (0 to 5):</label>
                <input
                    type="number"
                    id="Rating"
                    name="Rating"
                    min="0"
                    max="5"
                    required
                />

                <label htmlFor="Ingredients">Ingredients (comma-separated):</label>
                <textarea
                    id="Ingredients"
                    name="Ingredients"
                    placeholder="e.g. sausage, egg, potatoes"
                />

                {/* <p>Burrito Type:</p> */}
                <div >
                    <fieldset className="radio-group">
                        <legend>Burrito Type:</legend>
                        <label>
                            <input
                                type="radio"
                                id="Homemade"
                                name="Homemade"
                                value="homemade"
                                defaultChecked
                            />
                            Homemade
                        </label>
                        <label>
                            <input
                                type="radio"
                                id="Purchased"
                                name="Purchased"
                                value="purchased"
                            />
                            Purchased
                        </label>
                    </fieldset>
                </div>

                {burritoType === "purchased" && (
                    <>
                        <label htmlFor="Price">Price ($):</label>
                        <input
                            type="number"
                            id="Price"
                            name="Price"
                            min="0"
                            required={burritoType === "purchased"}
                        />

                        <label htmlFor="Location">Location:</label>
                        <input
                            type="text"
                            id="Location"
                            name="Location"
                            required={burritoType === "purchased"}
                        />

                        <label htmlFor="Restaurant">Restaurant Name:</label>
                        <input
                            type="text"
                            id="Restaurant"
                            name="Restaurant"
                            required={burritoType === "purchased"}
                        />

                        <button>Submit</button>
                    </>
                )}

                <p>Upload Image:</p>
                <ImageUploader imageUrl={imageSrc} setImageUrl={setImageSrc} />

                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default PostCreation;

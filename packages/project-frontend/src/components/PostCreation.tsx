import React, { useState } from "react";
import { useActionState } from "react";
import "./PostCreation.css";
import { User } from "../types/user";
import { Loading } from "./Loading";
import { ImageUploader } from "./ImageUploader";


const PostCreation = ({ user, authToken }: { user: User, authToken: String }) => {
   
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [type, setType] = useState<"purchased" | "homemade">("homemade"); // "homemade" or "purchased"

    const [result, submitAction, isPending] = useActionState(
        async (prevState: { type: string; message: string; } | null, formData: FormData) => {
            const title = (formData.get("title") as string)?.trim() || "";
            const description = (formData.get("description") as string)?.trim() || "";
            const rating = formData.get("rating");
            const ingredients = (formData.get("ingredients") as string)?.trim();
            const price = formData.get("price");
            const location = formData.get("location");
            const restaurant = formData.get("restaurant");

            console.log("please log");

            if (!title || !description || !rating) {
                return {
                    type: "error",
                    message: "Title, description, and rating are required.",
                };
            }

            if (type === "purchased" && (!price || !location || !restaurant)) {
                return {
                    type: "error",
                    message: "Price, location, and restaurant are required for purchased burritos.",
                };
            }

            console.log(imageFile);
            if (!imageFile?.name) {
                return {
                    type: "error",
                    message: "Please upload an image before submitting.",
                };
            }

            formData.append("type", type);
            formData.append("image", imageFile);
            formData.append("createdBy", user._id);
            if (!ingredients){
                formData.delete("ingredients");
            }
            if (type === "homemade"){
                formData.delete("price");
                formData.delete("location");
                formData.delete("restaurant");
            }

            try {
                console.log("attempting fetch");
                const response = await fetch("/api/posts", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                if (!response.ok) {

                    return {
                        type: "error",
                        message: `${response.status}: Error submitting the image.`,
                    };
                }
            } catch (error) { // Network error
                console.error(error);
                // Return an error message...
            }
            setImageSrc(null);
            setImageFile(null);
            return { type: "success", message: "Post created successfully!" };
        }, null);

    return (
        <div className="post-creation">
            <h2>Create a New Post</h2>
            <form action={submitAction}>
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
                    name="description"
                    required
                />

                <label htmlFor="Rating">Rating (0 to 5):</label>
                <input
                    type="number"
                    id="Rating"
                    name="rating"
                    min="0"
                    max="5"
                    required
                />

                <label htmlFor="Ingredients">Ingredients (comma-separated):</label>
                <textarea
                    id="Ingredients"
                    name="ingredients"
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
                                name="homemade"
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
                                name="purchased"
                                value="purchased"
                                checked={type === "purchased"}
                                onChange={() => setType("purchased")}
                            />
                            Purchased
                        </label>
                    </fieldset>
                </div>

                {type === "purchased" && (
                    <>
                        <label htmlFor="Price">Price ($):</label>
                        <input
                            type="number"
                            id="Price"
                            name="price"
                            min="0"
                            required={type === "purchased"}
                        />

                        <label htmlFor="Location">Location:</label>
                        <input
                            type="text"
                            id="Location"
                            defaultValue={user.location}
                            name="location"
                            required={type === "purchased"}
                        />

                        <label htmlFor="Restaurant">Restaurant Name:</label>
                        <input
                            type="text"
                            id="Restaurant"
                            name="restaurant"
                            required={type === "purchased"}
                        />
                    </>
                )}

                <p>Upload Image:</p>
                <ImageUploader imageUrl={imageSrc || ''} setImageUrl={setImageSrc} setImageFile={setImageFile} />

                <button type="submit">Create Post</button>
                {result && <p className={`${result.type}`}>{result.message}</p>}
                {isPending && <Loading />}
                {/* {error && <p className="error">{error}</p>} */}
            </form>
        </div>
    );
};

export default PostCreation;

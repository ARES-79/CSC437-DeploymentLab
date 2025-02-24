import { useEffect, useState } from "react";

/**
 * Generates an image URL based on provided width, height, and placeholder text.
 * The image is generated when triggered by a button click.
 * 
 * @param width {number} The width of the image.
 * @param height {number} The height of the image.
 * @param placeholderText {string} The text to display on the image.
 * @param initialImageUrl {string} The initial image URL to display before generation.
 * @returns {object} { generateImage: function to trigger image generation, imageUrl: the generated image URL }
 */
export function useImageGeneration(width = 300, height = 200, placeholderText = "Your Image Here", initialImageUrl = "") {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);

    // Function to generate the image when triggered
    const generateImage = () => {
        const url = `https://place-hold.it/${width}x${height}.png/${Math.floor(Math.random() * 16777215).toString(16)}/ffffff?text=${encodeURIComponent(placeholderText)}`;
        setImageUrl(url);
    };

    return { generateImage, imageUrl, setImageUrl };
}
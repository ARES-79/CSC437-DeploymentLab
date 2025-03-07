import React, { useRef, useState } from "react";


interface ImageUploaderProps {
    imageUrl: string;
    setImageUrl: (url: string) => void;
}

export function ImageUploader({ imageUrl, setImageUrl }: ImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click(); // Open file explorer
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get first selected file
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    };

    return (
        <>
            <button id="Upload" type="button" onClick={handleButtonClick}>
                Upload File
            </button>

            <div className="image-preview-holder">
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                {imageUrl && <img src={imageUrl} alt="Preview" className="image-preview" />}
            </div>
        </>
    );
}

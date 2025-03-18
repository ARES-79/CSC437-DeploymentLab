import React, { useRef, useId, useState } from "react";

interface ImageUploaderProps {
    imageUrl: string;
    setImageUrl: (url: string) => void;
    setImageFile: (file: File) => void;
}

export function ImageUploader({ imageUrl, setImageUrl, setImageFile }: ImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const inputId = useId();

    const handleButtonClick = () => {
        fileInputRef.current?.click(); // Open file explorer
    };

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0]; // Get first selected file
    //     if (file) {
    //         const url = URL.createObjectURL(file);
    //         setImageUrl(url);
    //     }
    // };

    function readAsDataURL(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => {
                // TypeScript will infer the correct type for `result` here.
                resolve(fr.result as string); // Ensures it's a string
            };
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
        });
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const inputElement = e.target;
        if (inputElement.files && inputElement.files[0]) {
            const fileObj = inputElement.files[0];

            setImageFile(fileObj);
            
            // Pass the file object to `readAsDataURL` and set the image URL
            readAsDataURL(fileObj).then((newImgSrc) => {
                setImageUrl(newImgSrc);  // Assuming `setImageUrl` is a state setter
            }).catch((err) => {
                console.error('Error reading file:', err);
            });
        } else {
            console.error('No file selected');
        }
    }

    return (
        <>
            <button id="Upload" type="button" onClick={handleButtonClick} aria-label="Upload an image">
                Upload File
            </button>

            <div className="image-preview-holder">
                <label htmlFor={inputId} className="sr-only" >Choose an image file to upload and preview it.</label>
                <input id={inputId} type="file" accept=".png,.jpg,.jpeg" ref={fileInputRef}
                    onChange={handleFileChange} className="hidden" />
                {imageUrl && <img src={imageUrl} alt="Preview of Uploaded Image" className="image-preview" />}
            </div>
        </>
    );
}

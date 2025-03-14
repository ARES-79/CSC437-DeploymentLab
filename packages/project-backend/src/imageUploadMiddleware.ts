import { Request, Response, NextFunction } from "express";
import multer from "multer";
import fs from "fs";

class ImageFormatError extends Error { }

const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        // TODO 1
        const uploadPath = process.env.IMAGE_UPLOAD_DIR
        if (!uploadPath) {
            console.error("MISSING UPLOAD DIRECTORY ENV VAR");
            return cb(new Error("Upload directory is not set"), "");
        }

        // Ensure the directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Create the directory recursively
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // TODO 2
        const mimeType = file.mimetype;
        let fileExt;
        if (mimeType == "image/png") {
            fileExt = "png";
        } else if (mimeType == "image/jpg") {
            fileExt = "jpg";
        } else {
            cb(new ImageFormatError("Unsupported image type"), "");
        }

        const fileName = Date.now() + "-" + Math.round(Math.random() * 1E9) + "." + fileExt;
        cb(null, fileName)

    }
});

export const imageMiddlewareFactory = multer({
    storage: storageEngine,
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
});

export function handleImageFileErrors(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof multer.MulterError || err instanceof ImageFormatError) {
        res.status(400).send({
            error: "Bad Request",
            message: err.message
        });
        return;
    }
    next(err); // Some other error, let the next middleware handle it
}
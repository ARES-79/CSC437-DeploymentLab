import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";
import { ImageData } from "../ImageProvider";
import { handleImageFileErrors, imageMiddlewareFactory } from "../imageUploadMiddleware";

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {
    app.get("/api/images/:imageId?", (req: Request, res: Response) => {

        const { imageId } = req.params;
        const imageProvider = new ImageProvider(mongoClient); // Create ImageProvider instance

        let userId: string | undefined = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
        }


        imageProvider.getAllImages(userId, imageId)
            .then(images => {
                res.json(images); // Send images as JSON response
            })
            .catch(error => {
                console.error("Error fetching images:", error);
                res.status(500).json({ error: "Internal Server Error" }); // Handle errors
            });
    });

    app.post(
        "/api/images",
        imageMiddlewareFactory.single("image"),
        handleImageFileErrors,
        async (req: Request, res: Response) => {

            if (!req.file || !req.body.name) {
                res.status(400).json({
                    error: "Bad request",
                    message: "Missing required field: image file or name",
                });
                return;
            }

            const imageDoc: ImageData = {
                _id: req.file.filename,
                src: `/uploads/${req.file.filename}`,
                name: req.body.name,
                likes: 0,
                author: res.locals.token.username
            }
            const imageProvider = new ImageProvider(mongoClient); 
            const result = await imageProvider.createImage(imageDoc);

            if(result){
                res.status(201).send(imageDoc);
                return;
            } else{
                 // Final handler function after the above two middleware functions finish running
                res.status(500).send("Error uploading the the image.");
            }
        }
    )

    app.patch('/api/images/:id', async (req: Request, res: Response) => {
        const { id } = req.params; // Extract the 'id' parameter from the URL
        const { name } = req.body; // Extract 'name' from the request body
        const imageProvider = new ImageProvider(mongoClient);

        console.log(`Received PATCH request for ID: ${id}, Name: ${name}`);

        if (!name) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing name property"
            });
            return;
        }

        const matchedCount = await imageProvider.updateImageName(id, name);
        console.log(matchedCount);

        if (matchedCount === 0) {  
            res.status(404).send({
                error: "Not found",
                message: "Image does not exist"
            });
            return;
        }  

        res.status(204).send()
        return;
    });
}

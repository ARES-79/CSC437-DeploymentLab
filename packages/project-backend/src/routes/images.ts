import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {

    //apis needed:
    // POSTS
    // GET /api/posts?createdBy=<userId>
    // GET /api/posts/:id
    // POST /api/posts
    // -- need something to update all posts of a user if they change their username or profile picture

    // USERS
    // GET /api/users/:id
    // PATCH /api/users/:id
    // POST /api/users -- for creating new users
    

    app.get("/api/images", (req: Request, res: Response) => {
        const imageProvider = new ImageProvider(mongoClient); // Create ImageProvider instance

        let userId: string | undefined = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
        }
        console.log(userId);

        imageProvider.getAllImages(userId)
            .then(images => {
                res.json(images); // Send images as JSON response
            })
            .catch(error => {
                console.error("Error fetching images:", error);
                res.status(500).json({ error: "Internal Server Error" }); // Handle errors
            });
    });

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
        }

        const matchedCount = await imageProvider.updateImageName(id, name);
        console.log(matchedCount);

        if (matchedCount === 0) {  
            res.status(404).send({
                error: "Not found",
                message: "Image does not exist"
            });
        }  

        res.status(204).send()
    });
}

import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { PostProvider } from "../PostProvider";
import { PostDocument } from "../types/posts";
import { handleImageFileErrors, imageMiddlewareFactory } from "../imageUploadMiddleware";

export function registerPostRoutes(app: express.Application, mongoClient: MongoClient) {
    app.get("/api/posts/:postId?", (req: Request, res: Response) => {

        const { postId } = req.params;
        const postProvider = new PostProvider(mongoClient); // Create ImageProvider instance

        let userId: string | undefined = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
        }


        postProvider.getAllPosts(userId, postId)
            .then(images => {
                res.json(images); // Send images as JSON response
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                res.status(500).json({ error: "Internal Server Error" }); // Handle errors
            });
    });

    app.post(
        "/api/posts",
        imageMiddlewareFactory.single("image"),
        handleImageFileErrors,
        async (req: Request, res: Response) => {
       
            if (!req.file || !req.body.title || !req.body.description || !req.body.type) {
                res.status(400).json({
                    error: "Bad request",
                    message: "Missing required field.",
                });
                return;
            }

            const postDoc: PostDocument = {
                _id: req.file.filename,
                createdBy: req.body.createdBy,
                image: `/uploads/${req.file.filename}`,
                title: req.body.title,
                description: req.body.description,
                type: req.body.type,
                rating: req.body.rating,
                ...(req.body.price !== undefined && { price: req.body.price }),
                ...(req.body.location !== undefined && { location: req.body.location }),
                ...(req.body.restaurant !== undefined && { restaurant: req.body.restaurant }),
                ...(req.body.ingredients !== undefined && { ingredients: req.body.ingredients.split(",").map((i: string) => i.trim()) })
            }
            const postProvider = new PostProvider(mongoClient);
            const result = await postProvider.createPost(postDoc);

            if (result) {
                res.status(201).send(postDoc);
                return;
            } else {
                // Final handler function after the above two middleware functions finish running
                res.status(500).send("Error uploading the image.");
            }
        }
    )
}

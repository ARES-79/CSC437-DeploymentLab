import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { UserProvider } from "../UserProvider";
import { handleImageFileErrors, imageMiddlewareFactory } from "../imageUploadMiddleware";

//apis needed:
// USERS
// GET /api/users/:id
// PATCH /api/users/:id

export function registerUserRoutes(app: express.Application, mongoClient: MongoClient) {
    app.get("/api/users/:userId", (req: Request, res: Response) => {

        const { userId } = req.params;
        const userProvider = new UserProvider(mongoClient);

        userProvider.getUser(userId)
            .then(
                user => {
                    if (!user) {
                        res.status(400).json({ error: `User with _id ${userId} does not exist.` })
                    } else {
                        res.json(user);
                    }
                }
            ).catch(error => {
                console.error("Error fetching user data:", error);
                res.status(500).json({ error: "Internal Server Error" });
            });
    });

    // app.patch(
    //     "/api/users/:userId",
    //     imageMiddlewareFactory.single("image"),
    //     handleImageFileErrors,
    //     async (req: Request, res: Response) => {
    //         console.log("file:", req.file);
    //         console.log("username:", req.body.username);
    //         console.log("description:", req.body.description);
    //         if (!req.file || !req.body.title || !req.body.description) {
    //             res.status(400).json({
    //                 error: "Bad request",
    //                 message: "Missing required field.",
    //             });
    //             return;
    //         }

    //         const postDoc: PostDocument = {
    //             _id: req.file.filename,
    //             createdBy: req.body.createdBy,
    //             image: `/uploads/${req.file.filename}`,
    //             title: req.body.title,
    //             description: req.body.description,
    //             type: req.body.type,
    //             rating: req.body.rating,
    //             price: req.body.price,
    //             location: req.body.location,
    //             restaurant: req.body.restaurant,
    //             ingredients: req.body.ingredients ? req.body.ingredients.split(",").map((i: string) => i.trim()) : []
    //         }
    //         const postProvider = new PostProvider(mongoClient);
    //         const result = await postProvider.createPost(postDoc);

    //         if (result) {
    //             res.status(201).send(postDoc);
    //             return;
    //         } else {
    //             // Final handler function after the above two middleware functions finish running
    //             res.status(500).send("Error uploading the the image.");
    //         }
    //     }
    // )
}

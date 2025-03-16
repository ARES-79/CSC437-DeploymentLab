import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { UserProvider } from "../UserProvider";
import { handleImageFileErrors, imageMiddlewareFactory } from "../imageUploadMiddleware";
import { UpdateUserData } from "../types/user";

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

    app.patch(
        "/api/users/:userId",
        imageMiddlewareFactory.single("image"),
        handleImageFileErrors,
        async (req: Request, res: Response) => {

            const { userId } = req.params;
            console.log("file:", req.file);
            console.log("username:", req.body.username);
            console.log("location:", req.body.location);
            console.log("darkmode:", req.body.darkmode);

            const userDoc: UpdateUserData = {
                ...(req.body.username && { username: req.body.username }),
                ...(req.file?.filename && { profilePicture: `/uploads/${req.file.filename}` }),
                ...(req.body.location && { location: req.body.location }),
                ...(req.body.darkmode !== undefined && { darkMode: req.body.darkmode })
            }

            const userProvider = new UserProvider(mongoClient);
            const result = await userProvider.updateUser(userId, userDoc);

            if (result) {
                res.status(200).send(userDoc);
                return;
            } else {
                // Final handler function after the above two middleware functions finish running
                res.status(500).send("Error uploading user profile.");
            }
        }
    );
}

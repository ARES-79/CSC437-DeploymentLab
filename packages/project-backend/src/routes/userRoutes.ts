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
    app.get("/api/user", (req: Request, res: Response) => {


        const username = res.locals.token.username; //from decoded auth token
        const userProvider = new UserProvider(mongoClient);

        userProvider.getUser(username)
            .then(
                user => {
                    if (!user) {
                        // console.log("Issue getting user.");
                        res.status(400).json({
                            error: "Bad request",
                            message: `User with username ${username} does not exist.`
                        })
                    } else {
                        res.json(user);
                    }
                }
            ).catch(error => {
                console.error("Error fetching user data:", error);
                res.status(500).json({ error: "Internal Error",
                    message: "Internal Server Error" });
            });
    });

    app.patch(
        "/api/users/:userId",
        imageMiddlewareFactory.single("image"),
        handleImageFileErrors,
        async (req: Request, res: Response) => {

            const { userId } = req.params;

            const userDoc: UpdateUserData = {
                ...(req.body.username && { username: req.body.username }),
                ...(req.file?.filename && { profilePicture: `/uploads/${req.file.filename}` }),
                ...(req.body.location && { location: req.body.location }),
                ...(req.body.darkmode !== undefined && { darkMode: req.body.darkmode === 'true' })
            }

            const userProvider = new UserProvider(mongoClient);
            const result = await userProvider.updateUser(userId, userDoc);

            if (result == 1) {
                res.status(200).send(userDoc);
                return;
            } else if (result == -1){
                res.status(400).send({message: "Username is already taken."});
            } else {
                // only other option should be result = 0
                res.status(400).send({message: "User with given id does not exist."});
            }
        }
    );
}

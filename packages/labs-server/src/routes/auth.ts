import express, { NextFunction, Request, Response } from "express";
import { MongoClient } from "mongodb";
import { CredentialsProvider } from "../CredentialsProvider";
import jwt from "jsonwebtoken";

export function verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction // Call next() to run the next middleware or request handler
) {
    const signatureKey = process.env.JWT_SECRET
    if (!signatureKey) {
        throw new Error("Missing JWT_SECRET from env file");
    }
    const authHeader = req.get("Authorization");
    // The header should say "Bearer <token string>".  Discard the Bearer part.
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).end();
    } else { // signatureKey already declared as a module-level variable
        jwt.verify(token, signatureKey, (error, decoded) => {
            if (decoded) {
                next();
            } else {
                res.status(403).end();
            }
        });
    }
}

function generateAuthToken(username: string): Promise<string> {
    const signatureKey = process.env.JWT_SECRET
    if (!signatureKey) {
        throw new Error("Missing JWT_SECRET from env file");
    }
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { username: username },
            signatureKey,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {
    const credentialsProvider = new CredentialsProvider(mongoClient); // Create ImageProvider instance

    app.post("/auth/register", (req: Request, res: Response) => {
        console.log("register request received");
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
            return;
        }

        credentialsProvider.registerUser(username, password)
            .then(result => {
                if (!result) {
                    res.status(400).send({
                        error: "Bad request",
                        message: "Username already taken"
                    });
                } else {
                    generateAuthToken(username).then(
                        token => { res.status(201).send({ token: token }); }
                    )
                }
            })
            .catch(error => {
                console.error("Error Registering User:", error);
                res.status(500).json({ error: "Internal Server Error" }); // Handle errors
            });

    });


    app.post("/auth/login", (req: Request, res: Response) => {
        console.log("login request received");
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
            return;
        }

        credentialsProvider.verifyPassword(username, password)
            .then(result => {
                if (!result) {
                    res.status(401).send({
                        error: "Bad request",
                        message: "Invalid Credentials"
                    });
                } else {
                    generateAuthToken(username).then(
                        token => { res.send({ token: token }) }
                    )
                }
            })
            .catch(error => {
                console.error("Error Verifying Password:", error);
                res.status(500).json({ error: "Internal Server Error" }); // Handle errors
            });

    });
}

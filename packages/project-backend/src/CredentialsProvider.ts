import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export interface ICredentialsDocumentForCreation {
    username: string;
    password: string;
}

interface IRegisterUserDocument {
    username: string;
    profilePicture?: string;
    location: string;
    darkMode?: boolean;
}

export class CredentialsProvider {
    private readonly creds_collection: Collection<ICredentialsDocumentForCreation>;
    private readonly users_collection: Collection<IRegisterUserDocument>;

    constructor(mongoClient: MongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        const USERS_COLLECTION_NAME = process.env.USERS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        if (!USERS_COLLECTION_NAME) {
            throw new Error("Missing USERS_COLLECTION_NAME from env file");
        }
        this.creds_collection = mongoClient.db().collection<ICredentialsDocumentForCreation>(COLLECTION_NAME);
        this.users_collection = mongoClient.db().collection<IRegisterUserDocument>(USERS_COLLECTION_NAME);
    }

    async registerUser(username: string, plaintextPassword: string, location: string) {
        const filter = { username: username };
        const existingUser = await this.creds_collection.findOne(filter);

        if (existingUser) { return false; }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

        //create a shared id to connect the user data and user credentials
        const { ObjectId } = require('mongodb'); 
        const newId = new ObjectId();

        this.creds_collection.insertOne({
            _id: newId,
            username: username,
            password: hashedPassword
        });

        this.users_collection.insertOne({
            _id: newId,
            username: username,
            location: location,
            darkMode: false
        })
        // Might also create other user metadata records here, but not in this lab.
        return true;
    }

    async verifyPassword(username: string, plaintextPassword: string) {

        const filter = { username: username };
        const user = await this.creds_collection.findOne(filter);

        if (!user) { return false; }

        const hashedDatabasePassword = user.password;
        const verified = await bcrypt.compare(plaintextPassword, hashedDatabasePassword)

        return verified;
    }
}

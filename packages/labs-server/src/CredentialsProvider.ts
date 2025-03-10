import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

interface ICredentialsDocument {
    username: string;
    password: string;
}

export class CredentialsProvider {
    private readonly collection: Collection<ICredentialsDocument>;

    constructor(mongoClient: MongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection<ICredentialsDocument>(COLLECTION_NAME);
    }

    async registerUser(username: string, plaintextPassword: string) {
        const filter = { username: username };
        const existingUser = await this.collection.findOne(filter);

        if (existingUser){ return false;}

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

        console.log("salt:", salt);
        console.log("hash:", hashedPassword);
        this.collection.insertOne({
            username: username,
            password: hashedPassword
        })
        // Might also create other user metadata records here, but not in this lab.
        return true;
    }

    async verifyPassword(username: string, plaintextPassword: string) {

        const filter = { username: username };
        const user = await this.collection.findOne(filter);

        if (!user){ return false;}

        const hashedDatabasePassword = user.password;
        const verified = await bcrypt.compare(plaintextPassword, hashedDatabasePassword)

        return verified;
    }
}

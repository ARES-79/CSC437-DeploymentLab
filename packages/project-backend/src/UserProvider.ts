import { MongoClient, UpdateResult, ObjectId } from "mongodb";
import { User, UpdateUserData } from "./types/user";
export class UserProvider {
    constructor(private readonly mongoClient: MongoClient) { }

    async getUser(userId: string): Promise<User | false> {
        const db = this.mongoClient.db();
        const usersCollection = db.collection<User>(process.env.USERS_COLLECTION_NAME || "users");

        const filter = { _id: userId };

        const user = await usersCollection.findOne(filter);

        if (!user) { return false; }

        return {
            ...user,
            _id: user._id.toString(), // Convert ObjectId to string
        };
    }

    async updateUser(userId: string, payload: UpdateUserData): Promise<number> {
        const db = this.mongoClient.db();

        //make sure you don't change the username to another user's username
        if (payload.username) {
            const usersCollection = db.collection<User>(process.env.USERS_COLLECTION_NAME || "users");

            const filter = { username: payload.username };

            const user = await usersCollection.findOne(filter);

            if (user) { return -1; }
        }

        // Convert userId to ObjectId only if it's in the correct format
        const filter = { _id: ObjectId.isValid(userId) ? new ObjectId(userId) : userId };

        const result: UpdateResult = await db
            .collection<User>(process.env.USERS_COLLECTION_NAME || "users")
            .updateOne(filter, { $set: { ...payload } });

        return result.matchedCount;
    }
};
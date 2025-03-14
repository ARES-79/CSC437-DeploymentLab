import { MongoClient, WithId, UpdateResult } from "mongodb";
import { PostDocument, PostCreatedBy } from "./types/posts";
export class PostProvider {
    constructor(private readonly mongoClient: MongoClient) { }

    async getAllPosts(userId?: string, imageId?: string): Promise<(Omit<PostDocument, "createdBy"> & { createdBy: Omit<WithId<PostCreatedBy>, "_id"> | null })[]> {
        const db = this.mongoClient.db();
        const postsCollection = db.collection<PostDocument>(process.env.POSTS_COLLECTION_NAME || "posts");
        const usersCollection = db.collection<PostCreatedBy>(process.env.USERS_COLLECTION_NAME || "users");

        let filter;
        if (!imageId){
            filter = userId ? { createdBy: userId } : {};
        } else {
            filter = {_id: imageId};
        }
        
        const images = await postsCollection.find(filter).toArray();

        const userIds = images.map(image => image.createdBy);
        const users = await usersCollection.find({ _id: { $in: userIds } }, {
            projection: { _id: 1, username: 1, profilePicture: 1 } // Only return _id, username, and profilePicture
        }).toArray();

        // Create a Map for quick lookup, keeping _id
        const userMap = new Map<string, PostCreatedBy>(
            users.map(user => [user._id, user]) // Store full user object, but only necessary fields
        );

        // Replace createdBy with denormalized user data
        return images.map(image => ({
            ...image,
            createdBy: userMap.get(image.createdBy) || null, // Null if user not found
        }));
    }

    async createPost(postDoc: PostDocument): Promise<boolean> {
        const db = this.mongoClient.db();
        try {
            await db.collection<PostDocument>(process.env.POSTS_COLLECTION_NAME || "posts")
                .insertOne(postDoc);
    
            return true;
        } catch (error) {
            console.error("Error adding post to the database:", error);
            return false;
        }
    }

};
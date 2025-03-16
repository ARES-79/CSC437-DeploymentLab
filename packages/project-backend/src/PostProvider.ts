import { MongoClient, WithId, UpdateResult, ObjectId } from "mongodb";
import { PostDocument, PostCreatedBy } from "./types/posts";
export class PostProvider {
    constructor(private readonly mongoClient: MongoClient) { }


    async getAllPosts(userId?: string, imageId?: string): Promise<(Omit<PostDocument, "createdBy"> & { createdBy: Omit<WithId<PostCreatedBy>, "_id"> | null })[]> {
        const db = this.mongoClient.db();
        const postsCollection = db.collection<PostDocument>(process.env.POSTS_COLLECTION_NAME || "posts");
        const usersCollection = db.collection<PostCreatedBy>(process.env.USERS_COLLECTION_NAME || "users");

        let filter;
        if (!imageId) {
            filter = userId ? { createdBy: userId } : {}; // userId is stored as a string in posts
        } else {
            filter = { _id: imageId };
        }

        const posts = await postsCollection.find(filter).toArray();

        // Convert createdBy (string) into ObjectId where valid
        const userIds = posts
            .map(post => (ObjectId.isValid(post.createdBy) ? new ObjectId(post.createdBy) : null))
            .filter((id): id is ObjectId => id !== null); // Remove null values

        if (userIds.length === 0) {
            return posts.map(post => ({ ...post, createdBy: null }));
        }

        // Fix: Cast userIds to match the expected type explicitly
        const users = await usersCollection
            .find(
                { _id: { $in: userIds as unknown as string[] } }, // Explicitly cast
                { projection: { username: 1, profilePicture: 1 } } // Exclude _id to match return type
            )
            .toArray();

        // Create a Map for quick lookup using string keys
        const userMap = new Map<string, Omit<WithId<PostCreatedBy>, "_id">>(
            users.map(user => [user._id.toString(), { _id: user._id.toString(), username: user.username, profilePicture: user.profilePicture }])
        );

        // Replace createdBy with denormalized user data
        return posts.map(post => ({
            ...post,
            createdBy: userMap.get(post.createdBy) || null, // Null if user not found
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
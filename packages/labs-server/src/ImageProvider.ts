import { MongoClient, WithId } from "mongodb";

interface ImageData {
    _id: string;
    src: string;
    name: string;
    author: string;
    likes: number;
}

interface UserData {
    _id: string;
    username: string;
    email: string;
}

export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) { }

    async getAllImages(): Promise<(Omit<ImageData, "author"> & { author: Omit<WithId<UserData>, "_id"> | null })[]> {
        const db = this.mongoClient.db();
        const imagesCollection = db.collection<ImageData>(process.env.IMAGES_COLLECTION_NAME || "images");
        const usersCollection = db.collection<UserData>(process.env.USERS_COLLECTION_NAME || "users");

        const images = await imagesCollection.find().toArray();

        // Fetch user details for each image
        const userIds = images.map(image => image.author);
        const users = await usersCollection.find({ _id: { $in: userIds } }).toArray();

        // Create a Map for quick lookup, keeping _id
        const userMap = new Map<string, WithId<UserData>>(
            users.map(user => [user._id, user]) // Store full user object including _id
        );

        // Replace author ID with full user details
        return images.map(image => ({
            ...image,
            author: userMap.get(image.author) || null, // Null if user not found
        }));
    }
};
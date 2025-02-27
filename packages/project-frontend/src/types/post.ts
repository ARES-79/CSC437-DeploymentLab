
export interface Post {
    id: string;
    userId: string;
    username: string;
    image: string;
    title: string;
    description: string;
    type: "purchased" | "homemade";
    rating: string;
    price?: string;
    location?: string;
    restaurant?: string;
    profilePicture?: string;
    ingredients?: string[];
}

export interface NewPostSubmission {
    userId: string;
    username: string;
    image: string;
    title: string;
    description: string;
    type: "purchased" | "homemade";
    rating: string;
    price?: string;
    location?: string;
    restaurant?: string;
    profilePicture?: string;
    ingredients?: string[];
}
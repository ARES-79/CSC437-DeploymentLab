export interface PostCreatedBy {
    _id: string;
    username: string;
    profilePicture?: string;
}

export interface PostFromAPI {
    _id: string;
    createdBy: PostCreatedBy ; //will be a userId
    image: string;
    title: string;
    description: string;
    type: "purchased" | "homemade";
    rating: string;
    price?: string;
    location?: string;
    restaurant?: string;
    ingredients?: string[];
}

export interface PostDocument {
    _id: string;
    createdBy: string ; //will be a userId
    image: string;
    title: string;
    description: string;
    type: "purchased" | "homemade";
    rating: string;
    price?: string;
    location?: string;
    restaurant?: string;
    ingredients?: string[];
}

export interface NewPostSubmission {
    createdBy: string ; //will be a userId
    image: string;
    title: string;
    description: string;
    type: "purchased" | "homemade";
    rating: string;
    price?: string;
    location?: string;
    restaurant?: string;
    ingredients?: string[];
}
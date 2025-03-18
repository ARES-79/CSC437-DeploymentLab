import { ObjectId } from "mongodb";

export interface User {
    _id: string | ObjectId;
    username: string;
    profilePicture?: string;
    location: string;
    darkMode: boolean;
  };

export interface UpdateUserData {
  username?: string;
  profilePicture?: string;
  location?: string;
  darkMode?: boolean;
};

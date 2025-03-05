export interface User {
    _id: string;
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
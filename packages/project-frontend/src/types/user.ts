export interface User {
    userId: string;
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
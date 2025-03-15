import { UpdateUserData, User } from "./user";

export interface profileInfoProps{
    user: User;
    updateUser: (user: UpdateUserData) => void;
    isDarkMode: boolean;
    handleDarkModeToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface profilePageProps{
    user: User;
    updateUser?: (user: UpdateUserData) => void;
    isDarkMode?: boolean;
    handleDarkModeToggle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
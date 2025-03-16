import PostCreation from "../components/PostCreation";
import { NewPostSubmission } from "../types/post";
import { User } from "../types/user";

export const CreatePostPage = ({user}: {user: User}) => {
    const handlePostSubmit = (postData: NewPostSubmission) => {
        console.log("New post submitted:", postData);
        // Send to backend API or update state
    };

    return (
        <>
            <PostCreation user={user}/>
        </>
    );
};


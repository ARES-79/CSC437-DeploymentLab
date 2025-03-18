import PostCreation from "../components/PostCreation";
import { NewPostSubmission } from "../types/post";
import { User } from "../types/user";

export const CreatePostPage = ({ user, authToken }: { user: User, authToken: string }) => {

    return (
        <>
            <PostCreation user={user} authToken={authToken} />
        </>
    );
};


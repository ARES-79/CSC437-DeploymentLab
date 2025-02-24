import PostCreation from "../components/PostCreation";

export const CreatePostPage = ({user}) => {
    const handlePostSubmit = (postData) => {
        console.log("New post submitted:", postData);
        // Send to backend API or update state
    };

    return (
        <>
            <PostCreation user={user} onSubmit={handlePostSubmit} />
        </>
    );
};


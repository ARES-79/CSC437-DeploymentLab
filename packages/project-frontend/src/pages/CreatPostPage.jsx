import PostCreation from "../components/PostCreation";

export const CreatePostPage = () => {
    const handlePostSubmit = (postData) => {
        console.log("New post submitted:", postData);
        // Send to backend API or update state
    };

    return (
        <div>
            <h1>New Post</h1>
            <PostCreation onSubmit={handlePostSubmit} />
        </div>
    );
};


import { UpdateUserData } from "../types/user";


export async function submitUpdatedInfo(
    userId: string,
    authToken: string,
    data: UpdateUserData,
    imageFile?: File,
    resetImageHandler?: React.Dispatch<React.SetStateAction<File | null>>) {

    const updateData = new FormData;

    console.log("image file in request handler", imageFile);
    if (data.profilePicture && imageFile?.name) {
        updateData.append("image", imageFile);
    }
    if (data.location) {
        updateData.append("location", data.location);
    }
    if (data.username) {
        updateData.append("username", data.username);
    }
    if (data.darkMode) {
        updateData.append("darkmode", data.darkMode.toString());
    }

    return fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
        body: updateData
    }).then(response => {
        if (response.status != 400 && imageFile?.name && resetImageHandler){
            resetImageHandler(null);
        }

        if (response.status === 400) {
            return response.json().then(data => {
                return {status: 'error', message: data.message || "An unknown server error occurred."};
            });
        }
        return {status: 'success', message: ''};
        // return (response.status == 200); 
    }).catch(error => {
        console.error(`Could not update user info: ${error}`);
        throw error;
    });
}
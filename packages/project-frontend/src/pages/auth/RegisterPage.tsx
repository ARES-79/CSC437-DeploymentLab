import { UsernamePasswordForm } from "../../components/auth/UsernamePasswordForm";
import { sendPostRequest } from "../../utils/sendPostRequest";
import { useNavigate } from 'react-router';
import "./RegisterPage.css"

export function RegisterPage({ onValidRegister } : {onValidRegister: React.Dispatch<React.SetStateAction<string>>}) {
    const navigate = useNavigate();
    const submissionHandler = async (username: string, password: string, location?: string ) => {

        const response = await sendPostRequest("/auth/register", { username: username, password: password, location: location });
        console.log(response.status);
        if (response.status == 400 || response.status == 500) {
            return {
                type: "error",
                message: response.body.message,
            };
        }
        onValidRegister(response.body.token);
        navigate("/");
        return null;
    };
    return (
        <div className="register-container">
            <h2>Register a New Account</h2>
            <UsernamePasswordForm onSubmit={submissionHandler} register={true}/>
        </div>
    );
}
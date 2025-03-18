import { UsernamePasswordForm } from "../../components/auth/UsernamePasswordForm";
import { Link, useNavigate } from 'react-router';
import { sendPostRequest } from "../../utils/sendPostRequest";
import "./LoginPage.css";

export function LoginPage({ onValidLogin }) { //: {onValidLogin: React.Dispatch<React.SetStateAction<string>>}
    const navigate = useNavigate();
    const submissionHandler = async (username, password) => { //(username: string , password: string)
        console.log("From Within Login Page.")
        console.log("username:", username);
        console.log("password:", password);
        const response = await sendPostRequest("/auth/login", { username: username, password: password });

        console.log(response.status);
        if (response.status == 401 || response.status == 500) {
            return {
                type: "error",
                message: response.body.message,
            };
        }
        console.log(response.body.token);
        onValidLogin(response.body.token);
        navigate("/");
        return;
    };
    return (
        <div className="login-container">
            <h2>Login</h2>
            <UsernamePasswordForm onSubmit={submissionHandler} register={false} />
            <p> Don't have an account? <Link to="/register" style={{ color: "var(--color-accent)" }}>Register here</Link></p>
        </div>
    );
}
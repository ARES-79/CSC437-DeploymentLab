import { useActionState } from "react";
import "./UsernamePasswordForm.css"
import { Loading } from "../Loading";

interface UserPasswordFromProps {
    onSubmit: (username: string, password: string, location?: string) => Promise<{ type: string; message: string; } | null>;
    register: boolean;
}

export function UsernamePasswordForm({ onSubmit, register }: UserPasswordFromProps) {

    const [result, submitAction, isPending] = useActionState(
        async (prevState: { type: string; message: string; } | null, formData: FormData) => {

            const password = formData.get("password");
            const username = formData.get("username");
            const location = formData.get("location");

            if (!username || !password) {
                return {
                    type: "error",
                    message: `Please fill in your username and password.`,
                };
            }

            if (register) {
                if (!location) {
                    return {
                        type: "error",
                        message: `Please enter a location.`,
                    };
                } else {
                    const submitResult = await onSubmit(username.toString(), password.toString(), location.toString());
                    return submitResult;
                }
            }

            const submitResult = await onSubmit(username.toString(), password.toString());
            return submitResult;
        },
        null
    );

    return (
        <div className="uandp_container">
            <form action={submitAction}>

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    placeholder="username"
                />


                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="password"
                />

                {
                    register &&
                    <>
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            placeholder="location"
                        />
                    </>
                }
                {(result && !isPending) && <p className={`message ${result.type}`}>{result.message}</p>}
                {isPending && <Loading />}
                {/* <div> */}
                    <button disabled={isPending} type="submit">Submit</button>
                {/* </div> */}
            </form>
        </div>

    );
}
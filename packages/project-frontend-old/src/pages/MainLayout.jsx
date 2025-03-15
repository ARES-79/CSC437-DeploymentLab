import Header from "../components/Header.jsx";
import { Outlet } from "react-router"

export function MainLayout(props) {
    return (
        <>
            <Header />
            <main style={{padding: "2em 1em"}}>
                <Outlet />
            </main>
        </>
    );
}

import Header from "../components/Header.jsx";
import { Outlet } from "react-router"

export function MainLayout(props) {
    return (
        <div>
            <Header />
            <div style={{padding: "2em 1em"}}>
                <Outlet />
            </div>
        </div>
    );
}

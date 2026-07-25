import { Outlet } from "react-router-dom";
import CitizenSidebar from "../components/citizen/CitizenSidebar.jsx";
import CitizenTopbar from "../components/citizen/CitizenTopbar.jsx";

export default function CitizenLayout() {
    return (
        <div className="dashboard">
            <CitizenSidebar />

            <main className="content">
                <CitizenTopbar />
                <Outlet />
            </main>
        </div>
    );
}
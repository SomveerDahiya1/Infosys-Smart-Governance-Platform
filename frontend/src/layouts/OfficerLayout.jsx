import { Outlet } from "react-router-dom";
import OfficerSidebar from "../components/officer/OfficerSidebar";
import OfficerTopbar from "../components/officer/OfficerTopbar";

export default function OfficerLayout() {
    return (
        <div className="dashboard">
            <OfficerSidebar />

            <main className="content">
                <OfficerTopbar />
                <Outlet />
            </main>
        </div>
    );
}
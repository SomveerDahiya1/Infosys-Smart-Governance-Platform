import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

export default function AdminLayout() {
    return (
        <div className="dashboard">
            <AdminSidebar />

            <div className="content">
                <AdminTopbar />
                <Outlet />
            </div>
        </div>
    );
}
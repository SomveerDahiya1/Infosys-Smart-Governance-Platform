import {
    FaHome,
    FaUsers,
    FaUserShield,
    FaClipboardList,
    FaChartBar,
    FaFileAlt,
    FaBell,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../../styles/admin/AdminSidebar.css";
export default function AdminSidebar() {
    const location = useLocation();
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>🏛️ CivicPulse</h2>
                <p>Admin Panel</p>
            </div>
            <ul>
                <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
                    <Link to="/admin/dashboard">
                        <FaHome/>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className={location.pathname === "/admin/officers" ? "active" : ""}>
                    <Link to="/admin/officers">
                        <FaUserShield/>
                        <span>Officers</span>
                    </Link>
                </li>
                <li className={location.pathname === "/admin/complaints" ? "active" : ""}>
                    <Link to="/admin/complaints">
                        <FaClipboardList/>
                        <span>Complaints</span>
                    </Link>
                </li>
                <li className={location.pathname === "/admin/analytics" ? "active" : ""}>
                    <Link to="/admin/analytics">
                        <FaChartBar/>
                        <span>Analytics</span>
                    </Link>
                </li>
                <li className={location.pathname === "/admin/reports" ? "active" : ""}>
                    <Link to="/admin/reports">
                        <FaFileAlt/>
                        <span>Reports</span>
                    </Link>
                </li>
                <li className={location.pathname === "/admin/notifications" ? "active" : ""}>
                    <Link to="/admin/notifications">
                        <FaBell/>
                        <span>Notifications</span>
                    </Link>
                </li>
                <li className={location.pathname === "/admin/profile" ? "active" : ""}>
                    <Link to="/admin/profile">
                        <FaUserCircle/>
                        <span>Profile</span>
                    </Link>
                </li>
            </ul>
            <div className="logout">
                <FaSignOutAlt/>
                <span>Logout</span>
            </div>
        </aside>
    );
}
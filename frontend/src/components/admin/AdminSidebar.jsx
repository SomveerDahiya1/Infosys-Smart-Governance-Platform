import {
    FaHome,
    FaUserShield,
    FaClipboardList,
    FaChartBar,
    FaFileAlt,
    FaBell,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

import {
    Link,
    useLocation
} from "react-router-dom";

import { logout } from "../../services/authService";

import "../../styles/admin/AdminSidebar.css";


export default function AdminSidebar() {

    const location = useLocation();


    return (

        <aside className="sidebar">

            {/* ==========================================
                LOGO
            ========================================== */}

            <div className="sidebar-logo">

                <h2>
                    🏛️ CivicPulse
                </h2>

                <p>
                    Admin Panel
                </p>

            </div>


            {/* ==========================================
                NAVIGATION
            ========================================== */}

            <ul>

                {/* DASHBOARD */}

                <li
                    className={
                        location.pathname === "/admin/dashboard"
                            ? "active"
                            : ""
                    }
                >

                    <Link to="/admin/dashboard">

                        <FaHome />

                        <span>
                            Dashboard
                        </span>

                    </Link>

                </li>


                {/* OFFICERS */}

                <li
                    className={
                        location.pathname === "/admin/officers"
                            ? "active"
                            : ""
                    }
                >

                    <Link to="/admin/officers">

                        <FaUserShield />

                        <span>
                            Officers
                        </span>

                    </Link>

                </li>


                {/* COMPLAINTS */}

                <li
                    className={
                        location.pathname === "/admin/complaints"
                            ? "active"
                            : ""
                    }
                >

                    <Link to="/admin/complaints">

                        <FaClipboardList />

                        <span>
                            Complaints
                        </span>

                    </Link>

                </li>


                {/* ANALYTICS */}

                <li
                    className={
                        location.pathname === "/admin/analytics"
                            ? "active"
                            : ""
                    }
                >

                    <Link to="/admin/analytics">

                        <FaChartBar />

                        <span>
                            Analytics
                        </span>

                    </Link>

                </li>


                {/* REPORTS */}

                <li
                    className={
                        location.pathname === "/admin/reports"
                            ? "active"
                            : ""
                    }
                >

                    <Link to="/admin/reports">

                        <FaFileAlt />

                        <span>
                            Reports
                        </span>

                    </Link>

                </li>


                {/* NOTIFICATIONS */}

                <li
                    className={
                        location.pathname === "/admin/notifications"
                            ? "active"
                            : ""
                    }
                >

                    <Link to="/admin/notifications">

                        <FaBell />

                        <span>
                            Notifications
                        </span>

                    </Link>

                </li>


                {/* PROFILE */}

                <li
                    className={
                        location.pathname === "/admin/profile"
                            ? "active"
                            : ""
                    }
                >

                    <Link to="/admin/profile">

                        <FaUserCircle />

                        <span>
                            Profile
                        </span>

                    </Link>

                </li>

            </ul>


            {/* ==========================================
                LOGOUT
            ========================================== */}

            <button
                type="button"
                className="logout"
                onClick={logout}
            >

                <FaSignOutAlt />

                <span>
                    <b>Logout</b>
                </span>

            </button>

        </aside>
    );
}
import {
    FaHome, FaClipboardList, FaFileAlt, FaEdit, FaBell, FaUser, FaSignOutAlt
} from "react-icons/fa";

import {Link, useLocation} from "react-router-dom";

import "../../styles/common/Sidebar.css";

export default function OfficerSidebar() {

    const location = useLocation();

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <h2>👮 CivicPulse</h2>

                <p>Officer Portal</p>

            </div>

            <ul>

                <li className={location.pathname === "/officer/dashboard" ? "active" : ""}>

                    <Link to="/officer/dashboard">

                        <FaHome/>

                        <span>Dashboard</span>

                    </Link>

                </li>

                <li className={location.pathname === "/officer/assigned" ? "active" : ""}>

                    <Link to="/officer/assigned">

                        <FaClipboardList/>

                        <span>Assigned Complaints</span>

                    </Link>
                </li>

                <li className={location.pathname === "/officer/notifications" ? "active" : ""}>

                    <Link to="/officer/notifications">

                        <FaBell/>

                        <span>Notifications</span>

                    </Link>

                </li>

                <li className={location.pathname === "/officer/profile" ? "active" : ""}>

                    <Link to="/officer/profile">

                        <FaUser/>

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
import {
    FaBell,
    FaMoon,
    FaUserCircle,
    FaSearch
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/common/Topbar.css";

export default function CitizenTopbar() {
    const navigate = useNavigate();

    return (
        <header className="topbar">
            <div>
                <h1>Citizen Dashboard</h1>
                <p>Good Morning, Somveer 👋</p>
            </div>

            <div className="topbar-right">
                <div className="search-box">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search complaints..."
                    />
                </div>

                {/* Notification Button */}
                <button
                    className="icon-btn"
                    onClick={() => navigate("/citizen/notifications")}
                    title="OfficerNotifications"
                >
                    <FaBell />
                </button>

                {/* Dark Mode Button */}
                <button className="icon-btn">
                    <FaMoon />
                </button>

                {/* OfficerProfile */}
                <div
                    className="profile"
                    onClick={() => navigate("/citizen/profile")}
                    style={{ cursor: "pointer" }}
                    title="OfficerProfile"
                >
                    <FaUserCircle />
                    <span>Citizen</span>
                </div>
            </div>
        </header>
    );
}
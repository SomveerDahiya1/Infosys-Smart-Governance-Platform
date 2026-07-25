import {
    FaBell,
    FaMoon,
    FaUserCircle,
    FaSearch
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/AdminTopbar.css";

export default function AdminTopbar() {
    const navigate = useNavigate();

    return (
        <header className="topbar">
            <div>
                <h1>Admin Dashboard</h1>
                <p>Welcome Back, Admin 👋</p>
            </div>

            <div className="topbar-right">
                <div className="search-box">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search..."
                    />
                </div>

                <button
                    className="icon-btn"
                    onClick={() => navigate("/admin/notifications")}
                >
                    <FaBell />
                </button>

                <button className="icon-btn">
                    <FaMoon />
                </button>

                <div
                    className="profile"
                    onClick={() => navigate("/admin/profile")}
                    style={{ cursor: "pointer" }}
                >
                    <FaUserCircle />
                    <span>Admin</span>
                </div>
            </div>
        </header>
    );
}
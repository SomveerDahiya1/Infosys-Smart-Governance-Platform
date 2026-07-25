import {
    FaBell,
    FaMoon,
    FaUserCircle,
    FaSearch
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/common/Topbar.css";

export default function OfficerTopbar() {
    const navigate = useNavigate();

    return (
        <header className="topbar">
            <div>
                <h1>Officer Dashboard</h1>
                <p>Welcome Officer 👮</p>
            </div>

            <div className="topbar-right">
                <div className="search-box">
                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search complaints..."
                    />
                </div>

                <button
                    className="icon-btn"
                    onClick={() => navigate("/officer/notifications")}
                >
                    <FaBell />
                </button>

                <button className="icon-btn">
                    <FaMoon />
                </button>

                <div
                    className="profile"
                    onClick={() => navigate("/officer/profile")}
                    style={{ cursor: "pointer" }}
                >
                    <FaUserCircle />
                    <span>Officer</span>
                </div>
            </div>
        </header>
    );
}
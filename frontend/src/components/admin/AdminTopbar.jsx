import {
    FaBell,
    FaMoon,
    FaUserCircle
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../../styles/admin/AdminTopbar.css";

export default function AdminTopbar() {

const navigate = useNavigate();


return (

    <header className="topbar">


        {/* ==========================================
            ADMIN INFO
        ========================================== */}

        <div>

            <h1>
                Admin Dashboard
            </h1>

            <p>
                Welcome Back, Admin 👋
            </p>

        </div>


        {/* ==========================================
            TOPBAR ACTIONS
        ========================================== */}

        <div className="topbar-right">


            {/* NOTIFICATIONS */}

            <button
                className="icon-btn"
                onClick={() =>
                    navigate("/admin/notifications")
                }
            >

                <FaBell />

            </button>


            {/* DARK MODE */}

            <button className="icon-btn">

                <FaMoon />

            </button>


            {/* PROFILE */}

            <div
                className="profile"
                onClick={() =>
                    navigate("/admin/profile")
                }
                style={{
                    cursor: "pointer"
                }}
            >

                <FaUserCircle />

                <span>
                    Admin
                </span>

            </div>


        </div>


    </header>

);


}

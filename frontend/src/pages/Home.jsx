import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Home.css";
import {
    FaUser,
    FaUserShield,
    FaBuilding,
    FaMoon,
    FaEnvelope,
    FaLock,
} from "react-icons/fa";
export default function Home() {
    const [portal, setPortal] = useState("Citizen");
    const navigate = useNavigate();
    return (
        <div className="home">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">
                    <div className="logo-circle">🏛️</div>
                    <div>
                        <h2>CivicPulse</h2>
                        <span>Smart Governance</span>
                    </div>
                </div>

                <button className="dark-btn">
                    <FaMoon /> Dark Mode
                </button>
            </nav>
            {/* Hero Section */}
            <section className="hero">
                {/* Left */}
                <div className="left">
                    <p className="tag">SMART GOVERNANCE SYSTEM</p>
                    <h1>
                        CivicPulse
                        <br />
                        Complaint Portal
                    </h1>
                    <p className="desc">
                        A unified platform where Citizens, Officers and
                        Administrators collaborate to resolve civic issues
                        efficiently.
                    </p>
                    <div className="features">
                        <div className="feature">
                            🚧 Road Complaints
                        </div>
                        <div className="feature">
                            💧 Water Issues
                        </div>
                        <div className="feature">
                            🚮 Sanitation
                        </div>
                        <div className="feature">
                            🚦 Traffic
                        </div>
                    </div>
                </div>
                {/* Right */}
                <div className="login-card">
                    <p className="small-title">LOGIN PORTAL</p>
                    <h2>{portal} Portal</h2>
                    <div className="tabs">
                        <button
                            className={portal === "Citizen" ? "active" : ""}
                            onClick={() => setPortal("Citizen")}
                        >
                            <FaUser />
                            Citizen
                        </button>
                        <button
                            className={portal === "Admin" ? "active" : ""}
                            onClick={() => setPortal("Admin")}
                        >
                            <FaBuilding />
                            Admin
                        </button>
                        <button
                            className={portal === "Officer" ? "active" : ""}
                            onClick={() => setPortal("Officer")}
                        >
                            <FaUserShield />
                            Officer
                        </button>
                    </div>
                    <label>Email</label>
                    <div className="input-box">
                        <FaEnvelope />
                        <input
                            type="email"
                            placeholder={`Enter ${portal.toLowerCase()} email`}
                        />
                    </div>
                    <label>Password</label>
                    <div className="input-box">
                        <FaLock />
                        <input
                            type="password"
                            placeholder="Enter password"
                        />
                    </div>
                    <button
                        className="login-btn"
                        onClick={() => {
                            if (portal === "Citizen") {
                                navigate("/citizen/dashboard");
                            }
                            else if (portal === "Officer") {
                                navigate("/officer/dashboard");
                            }
                            else {
                                navigate("/admin/dashboard");
                            }
                        }}
                    >
                        Continue to {portal} Portal
                    </button>
                    <div className="bottom-links">
                        <a href="#">Create Account</a>
                        <a href="#">Forgot Password?</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
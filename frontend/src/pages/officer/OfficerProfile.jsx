import { useState } from "react";
import {
    FaUserCircle,
    FaPhone,
    FaEnvelope,
    FaBuilding,
    FaIdBadge,
    FaMapMarkerAlt,
    FaBriefcase,
    FaClipboardList,
    FaCheckCircle,
    FaStar,
    FaEdit,
    FaLock,
    FaSignOutAlt
} from "react-icons/fa";

import "../../styles/officer/OfficerProfile.css";

export default function OfficerProfile() {

    const [editing,setEditing]=useState(false);

    return(
        <div className="profile-page">

            {/* Profile Header */}
            <div className="profile-header">

                <FaUserCircle className="profile-avatar"/>

                <div>
                    <h1>Rahul Sharma</h1>
                    <p>Senior Field Officer</p>
                </div>

            </div>

            {/* Personal Information */}
            <div className="profile-card">

                <h2>Personal Information</h2>

                <div className="profile-grid">

                    <div>
                        <FaIdBadge/>
                        <span>Officer ID : OFC2026001</span>
                    </div>

                    <div>
                        <FaBuilding/>
                        <span>Department : Public Works</span>
                    </div>

                    <div>
                        <FaMapMarkerAlt/>
                        <span>Ward : Ward 12</span>
                    </div>

                    <div>
                        <FaPhone/>
                        <span>+91 98XXXXXXXX</span>
                    </div>

                    <div>
                        <FaEnvelope/>
                        <span>rahul@civicpulse.gov</span>
                    </div>

                    <div>
                        <FaBriefcase/>
                        <span>Experience : 6 Years</span>
                    </div>

                </div>

            </div>

            {/* Performance */}
            <div className="profile-card">

                <h2>Performance</h2>

                <div className="stats-grid">

                    <div className="stat-box">
                        <FaClipboardList/>
                        <h3>185</h3>
                        <p>Total Assigned</p>
                    </div>

                    <div className="stat-box">
                        <FaCheckCircle/>
                        <h3>170</h3>
                        <p>Resolved</p>
                    </div>

                    <div className="stat-box">
                        <FaStar/>
                        <h3>4.8</h3>
                        <p>Citizen Rating</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="profile-card">

                <h2>Account</h2>

                <div className="profile-actions">

                    <button>
                        <FaEdit/>
                        {editing ? "Save Profile" : "Edit Profile"}
                    </button>

                    <button>
                        <FaLock/>
                        Change Password
                    </button>

                    <button className="logout-btn">
                        <FaSignOutAlt/>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );

}
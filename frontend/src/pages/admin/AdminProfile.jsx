import { useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCamera,
    FaSave
} from "react-icons/fa";
import "../../styles/admin/AdminProfile.css";

export default function AdminProfile() {
    const [name, setName] = useState("System Administrator");
    const [email, setEmail] = useState("admin@civicpulse.com");
    const [phone, setPhone] = useState("+91 9876543210");
    const [address, setAddress] = useState("Gurgaon, Haryana");

    return (
        <div className="profile-page">
            {/* Header */}
            <div className="profile-header">
                <h1>Admin Profile</h1>
                <p>
                    Manage your personal information and account settings.
                </p>
            </div>

            <div className="profile-container">
                {/* Left */}
                <div className="profile-card">
                    <div className="profile-image">
                        <img
                            src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff&size=200"
                            alt="Admin"
                        />

                        <button>
                            <FaCamera />
                        </button>
                    </div>

                    <h2>System Administrator</h2>
                    <p>CivicPulse Platform</p>
                </div>

                {/* Right */}
                <div className="profile-form">
                    <div className="form-group">
                        <label>
                            <FaUser />
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <FaEnvelope />
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <FaPhone />
                            Phone
                        </label>

                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            <FaMapMarkerAlt />
                            Address
                        </label>

                        <textarea
                            rows="4"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <button className="save-btn">
                        <FaSave />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
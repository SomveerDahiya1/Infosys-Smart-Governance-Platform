import {
    FaClipboardList,
    FaUsers,
    FaUserShield,
    FaChartLine,
    FaArrowRight,
    FaBell,
    FaFileAlt,
    FaCheckCircle
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../../styles/admin/AdminDashboard.css";

export default function AdminDashboard() {

    const navigate = useNavigate();

    return (

        <div className="dashboard-page">

            {/* Welcome */}

            <div className="welcome-banner admin-banner">

                <div>

                    <h2>Welcome Admin 👨‍💼</h2>

                    <p>
                        Monitor complaints, manage officers and
                        citizens, analyze reports and oversee
                        the complete CivicPulse platform.
                    </p>

                </div>

            </div>

            {/* Stats */}

            <div className="dashboard-cards">

                <div className="card">

                    <FaClipboardList className="card-icon blue" />

                    <h2>1,248</h2>

                    <p>Total Complaints</p>

                </div>

                <div className="card">

                    <FaUserShield className="card-icon purple" />

                    <h2>42</h2>

                    <p>Total Officers</p>

                </div>

                <div className="card">

                    <FaUsers className="card-icon orange" />

                    <h2>8,734</h2>

                    <p>Total Citizens</p>

                </div>

                <div className="card">

                    <FaCheckCircle className="card-icon green" />

                    <h2>87%</h2>

                    <p>Resolution Rate</p>

                </div>

            </div>

            {/* Recent Complaints */}

            <div className="table-card">

                <div className="section-header">

                    <h2>Recent Complaints</h2>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/admin/complaints")}
                    >

                        View All

                    </button>

                </div>

                <table>

                    <thead>

                    <tr>

                        <th>ID</th>

                        <th>Citizen</th>

                        <th>Category</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                    </thead>

                    <tbody>

                    <tr>

                        <td>CP2026001</td>

                        <td>Somveer Dahiya</td>

                        <td>Road Damage</td>

                        <td>

                            <span className="pending">

                                Pending

                            </span>

                        </td>

                        <td>

                            <button className="link-btn">

                                Open <FaArrowRight />

                            </button>

                        </td>

                    </tr>

                    <tr>

                        <td>CP2026002</td>

                        <td>Rahul Sharma</td>

                        <td>Water Leakage</td>

                        <td>

                            <span className="progress">

                                In Progress

                            </span>

                        </td>

                        <td>

                            <button className="link-btn">

                                Open <FaArrowRight />

                            </button>

                        </td>

                    </tr>

                    <tr>

                        <td>CP2026003</td>

                        <td>Amit Kumar</td>

                        <td>Garbage</td>

                        <td>

                            <span className="resolved">

                                Resolved

                            </span>

                        </td>

                        <td>

                            <button className="link-btn">

                                Open <FaArrowRight />

                            </button>

                        </td>

                    </tr>

                    </tbody>

                </table>

            </div>

            {/* Quick Actions */}

            <div className="quick-actions">

                <button
                    className="action-btn"
                    onClick={() => navigate("/admin/officers")}
                >

                    <FaUserShield />

                    Manage Officers

                </button>

                <button
                    className="action-btn"
                    onClick={() => navigate("/admin/complaints")}
                >

                    <FaClipboardList />

                    Manage Complaints

                </button>

                <button
                    className="action-btn"
                    onClick={() => navigate("/admin/analytics")}
                >

                    <FaChartLine />

                    Analytics

                </button>

                <button
                    className="action-btn"
                    onClick={() => navigate("/admin/reports")}
                >

                    <FaFileAlt />

                    Reports

                </button>

                <button
                    className="action-btn"
                    onClick={() => navigate("/admin/notifications")}
                >

                    <FaBell />

                    Notifications

                </button>

            </div>

        </div>

    );

}
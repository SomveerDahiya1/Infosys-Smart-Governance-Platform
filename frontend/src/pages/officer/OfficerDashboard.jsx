import {
    FaClipboardList,
    FaClock,
    FaTools,
    FaCheckCircle,
    FaArrowRight
} from "react-icons/fa";

import "../../styles/officer/OfficerDashboard.css";

export default function OfficerDashboard() {
    return (
        <div className="dashboard-page">
            {/* Welcome */}
            <div className="welcome-banner officer-banner">
                <div>
                    <h2>Welcome Officer 👮</h2>

                    <p>
                        Manage assigned complaints efficiently and keep citizens updated.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="dashboard-cards">
                <div className="card">
                    <FaClipboardList className="card-icon blue"/>

                    <h2>18</h2>

                    <p>
                        Assigned
                    </p>
                </div>

                <div className="card">
                    <FaClock className="card-icon orange"/>

                    <h2>7</h2>

                    <p>
                        Pending
                    </p>
                </div>

                <div className="card">
                    <FaTools className="card-icon purple"/>

                    <h2>6</h2>

                    <p>
                        In Progress
                    </p>
                </div>

                <div className="card">
                    <FaCheckCircle className="card-icon green"/>

                    <h2>5</h2>

                    <p>
                        Resolved Today
                    </p>
                </div>
            </div>

            {/* Assigned Complaints */}
            <div className="table-card">
                <div className="section-header">
                    <h2>Assigned Complaints</h2>

                    <button className="secondary-btn">
                        View All
                    </button>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th>ID</th>

                        <th>Category</th>

                        <th>Location</th>

                        <th>Status</th>

                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>CP2026001</td>

                        <td>Road</td>

                        <td>Sector 14</td>

                        <td>
                                <span className="pending">
                                    Pending
                                </span>
                        </td>

                        <td>
                            <button className="link-btn">
                                Open <FaArrowRight/>
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td>CP2026002</td>

                        <td>Water</td>

                        <td>Sector 10</td>

                        <td>
                                <span className="progress">
                                    In Progress
                                </span>
                        </td>

                        <td>
                            <button className="link-btn">
                                Open <FaArrowRight/>
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td>CP2026003</td>

                        <td>Street Light</td>

                        <td>Sector 21</td>

                        <td>
                                <span className="resolved">
                                    Resolved
                                </span>
                        </td>

                        <td>
                            <button className="link-btn">
                                Open <FaArrowRight/>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <button className="action-btn">
                    📋 View Assigned
                </button>

                <button className="action-btn">
                    🔄 Update Status
                </button>

                <button className="action-btn">
                    📢 Send Update
                </button>

                <button className="action-btn">
                    📈 Performance
                </button>
            </div>
        </div>
    );
}
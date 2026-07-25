import "../../styles/common/Dashboard.css";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../../components/common/DashboardCard.jsx";
import QuickActions from "../../components/common/QuickActions.jsx";
import ComplaintTable from "../../components/common/ComplaintTable.jsx";
import {
    FaClipboardList,
    FaClock,
    FaSpinner,
    FaCheckCircle
} from "react-icons/fa";

export default function CitizenDashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <main className="content">
                {/* Statistics */}
                <div className="stats">
                    <DashboardCard
                        title="Total Complaints"
                        count="12"
                        icon={<FaClipboardList />}
                        color="#2563eb"
                    />

                    <DashboardCard
                        title="Pending"
                        count="3"
                        icon={<FaClock />}
                        color="#f59e0b"
                    />

                    <DashboardCard
                        title="In Progress"
                        count="5"
                        icon={<FaSpinner />}
                        color="#3b82f6"
                    />

                    <DashboardCard
                        title="Resolved"
                        count="4"
                        icon={<FaCheckCircle />}
                        color="#16a34a"
                    />
                </div>

                {/* Toolbar */}
                <div className="toolbar">
                    <input
                        className="search"
                        placeholder="Search Complaint..."
                    />

                    <button
                        className="new-btn"
                        onClick={() => navigate("/citizen/submit")}
                    >
                        + New Complaint
                    </button>
                </div>

                {/* Complaint Table */}
                <ComplaintTable />

                <QuickActions />

                <div className="bottom-section">
                    <div className="notification-card">
                        <h2>Latest Updates</h2>

                        <ul>
                            <li>✅ Road Complaint #CP001 Assigned</li>
                            <li>🚰 Water Leakage Complaint Resolved</li>
                            <li>📢 Municipality issued new notice.</li>
                            <li>⭐ Don't forget to submit feedback.</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}
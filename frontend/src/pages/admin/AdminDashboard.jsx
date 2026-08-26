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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import complaintService from "../../services/complaintService";

import "../../styles/admin/AdminDashboard.css";

export default function AdminDashboard() {


const navigate = useNavigate();

const [dashboardData, setDashboardData] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    assignedComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
    closedComplaints: 0,
    rejectedComplaints: 0
});

const [complaints, setComplaints] = useState([]);

const [loading, setLoading] = useState(true);

const [error, setError] = useState("");

useEffect(() => {

    const fetchDashboardData = async () => {

        try {

            setLoading(true);

            const [
                dashboardResponse,
                complaintsResponse
            ] = await Promise.all([
                complaintService.getDashboardStatistics(),
                complaintService.getAllComplaints()
            ]);


            // Dashboard statistics
            if (dashboardResponse.success) {

                setDashboardData(
                    dashboardResponse.data
                );
            }


            // All complaints
            if (complaintsResponse.success) {

                setComplaints(
                    complaintsResponse.data || []
                );
            }

        } catch (error) {

            console.error(
                "Error fetching dashboard data:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load dashboard data"
            );

        } finally {

            setLoading(false);

        }

    };

    fetchDashboardData();

}, []);


// Resolution Rate
const resolutionRate =
    dashboardData.totalComplaints > 0
        ? Math.round(
            (
                dashboardData.resolvedComplaints /
                dashboardData.totalComplaints
            ) * 100
        )
        : 0;


// Latest 5 complaints
const recentComplaints =
    [...complaints]
        .sort(
            (a, b) =>
                new Date(b.submittedAt) -
                new Date(a.submittedAt)
        )
        .slice(0, 5);


// Status class for existing CSS
const getStatusClass = (status) => {

    if (!status) {
        return "pending";
    }

    switch (status.toUpperCase()) {

        case "PENDING":
            return "pending";

        case "ASSIGNED":
        case "IN_PROGRESS":
            return "progress";

        case "RESOLVED":
        case "CLOSED":
            return "resolved";

        default:
            return "pending";
    }

};


if (loading) {

    return (
        <div className="dashboard-page">

            <div className="welcome-banner admin-banner">
                <div>
                    <h2>
                        Loading Dashboard...
                    </h2>

                    <p>
                        Please wait while we fetch the
                        latest CivicPulse data.
                    </p>
                </div>
            </div>

        </div>
    );

}


if (error) {

    return (
        <div className="dashboard-page">

            <div className="welcome-banner admin-banner">
                <div>
                    <h2>
                        Unable to Load Dashboard
                    </h2>

                    <p>
                        {error}
                    </p>
                </div>
            </div>

        </div>
    );

}


return (

    <div className="dashboard-page">

        {/* Welcome */}

        <div className="welcome-banner admin-banner">

            <div>

                <h2>
                    Welcome Admin 👨‍💼
                </h2>

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

                <FaClipboardList
                    className="card-icon blue"
                />

                <h2>
                    {dashboardData.totalComplaints}
                </h2>

                <p>
                    Total Complaints
                </p>

            </div>


            <div className="card">

                <FaUserShield
                    className="card-icon purple"
                />

                <h2>
                    {dashboardData.assignedComplaints}
                </h2>

                <p>
                    Assigned Complaints
                </p>

            </div>


            <div className="card">

                <FaUsers
                    className="card-icon orange"
                />

                <h2>
                    {dashboardData.pendingComplaints}
                </h2>

                <p>
                    Pending Complaints
                </p>

            </div>


            <div className="card">

                <FaCheckCircle
                    className="card-icon green"
                />

                <h2>
                    {resolutionRate}%
                </h2>

                <p>
                    Resolution Rate
                </p>

            </div>

        </div>


        {/* Recent Complaints */}

        <div className="table-card">

            <div className="section-header">

                <h2>
                    Recent Complaints
                </h2>

                <button
                    className="secondary-btn"
                    onClick={() =>
                        navigate(
                            "/admin/complaints"
                        )
                    }
                >
                    View All
                </button>

            </div>


            <table>

                <thead>

                <tr>

                    <th>ID</th>

                    <th>Category</th>

                    <th>Title</th>

                    <th>Status</th>

                    <th>Action</th>

                </tr>

                </thead>


                <tbody>

                {recentComplaints.length > 0 ? (

                    recentComplaints.map(
                        (complaint) => (

                            <tr
                                key={
                                    complaint.complaintId
                                }
                            >

                                <td>
                                    CP
                                    {String(
                                        complaint.complaintId
                                    ).padStart(
                                        6,
                                        "0"
                                    )}
                                </td>


                                <td>
                                    {
                                        complaint.category ||
                                        "N/A"
                                    }
                                </td>


                                <td>
                                    {
                                        complaint.title ||
                                        "Untitled Complaint"
                                    }
                                </td>


                                <td>

                                    <span
                                        className={
                                            getStatusClass(
                                                complaint.status
                                            )
                                        }
                                    >

                                        {
                                            complaint.status ||
                                            "PENDING"
                                        }

                                    </span>

                                </td>


                                <td>

                                    <button
                                        className="link-btn"
                                        onClick={() =>
                                            navigate(
                                                `/admin/complaints`
                                            )
                                        }
                                    >

                                        Open
                                        <FaArrowRight />

                                    </button>

                                </td>

                            </tr>

                        )
                    )

                ) : (

                    <tr>

                        <td
                            colSpan="5"
                            style={{
                                textAlign: "center"
                            }}
                        >

                            No complaints found

                        </td>

                    </tr>

                )}

                </tbody>

            </table>

        </div>


        {/* Quick Actions */}

        <div className="quick-actions">

            <button
                className="action-btn"
                onClick={() =>
                    navigate("/admin/officers")
                }
            >

                <FaUserShield />

                Manage Officers

            </button>


            <button
                className="action-btn"
                onClick={() =>
                    navigate(
                        "/admin/complaints"
                    )
                }
            >

                <FaClipboardList />

                Manage Complaints

            </button>


            <button
                className="action-btn"
                onClick={() =>
                    navigate(
                        "/admin/analytics"
                    )
                }
            >

                <FaChartLine />

                Analytics

            </button>


            <button
                className="action-btn"
                onClick={() =>
                    navigate(
                        "/admin/reports"
                    )
                }
            >

                <FaFileAlt />

                Reports

            </button>


            <button
                className="action-btn"
                onClick={() =>
                    navigate(
                        "/admin/notifications"
                    )
                }
            >

                <FaBell />

                Notifications

            </button>

        </div>

    </div>

);


}

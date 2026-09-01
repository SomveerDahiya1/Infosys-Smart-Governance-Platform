import "../../styles/common/Dashboard.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../../components/common/DashboardCard.jsx";
import QuickActions from "../../components/common/QuickActions.jsx";
import RecentComplaints from "../../components/citizen/RecentComplaints.jsx";

import complaintService from "../../services/complaintService";

import {
    FaClipboardList,
    FaClock,
    FaSpinner,
    FaCheckCircle
} from "react-icons/fa";


export default function CitizenDashboard() {

    const navigate = useNavigate();


    // ==========================================
    // STATE
    // ==========================================

    const [statistics, setStatistics] =
        useState({
            total: 0,
            pending: 0,
            inProgress: 0,
            resolved: 0
        });


    const [loading, setLoading] =
        useState(true);


    // ==========================================
    // FETCH CITIZEN COMPLAINT STATISTICS
    // ==========================================

    useEffect(() => {

        const fetchStatistics = async () => {

            try {

                setLoading(true);


                // ==========================================
                // GET ACTUAL CITIZEN ID
                // ==========================================

                const citizenId =
                    localStorage.getItem(
                        "citizenId"
                    );


                console.log(
                    "Dashboard Citizen ID:",
                    citizenId
                );


                if (!citizenId) {

                    console.error(
                        "Citizen ID not found. Please login again."
                    );

                    setStatistics({
                        total: 0,
                        pending: 0,
                        inProgress: 0,
                        resolved: 0
                    });

                    return;
                }


                // ==========================================
                // FETCH CITIZEN COMPLAINTS
                // ==========================================

                const response =
                    await complaintService
                        .getComplaintsByCitizen(
                            citizenId
                        );


                console.log(
                    "Citizen complaints response:",
                    response
                );


                if (response.success) {

                    const complaints =
                        response.data || [];


                    // ==========================================
                    // TOTAL
                    // ==========================================

                    const total =
                        complaints.length;


                    // ==========================================
                    // PENDING
                    // ==========================================

                    const pending =
                        complaints.filter(
                            (complaint) =>
                                complaint.status
                                    ?.toUpperCase() ===
                                "PENDING"
                        ).length;


                    // ==========================================
                    // IN PROGRESS
                    // ==========================================

                    const inProgress =
                        complaints.filter(
                            (complaint) => {

                                const status =
                                    complaint.status
                                        ?.toUpperCase();

                                return (
                                    status ===
                                    "IN_PROGRESS" ||

                                    status ===
                                    "ASSIGNED"
                                );

                            }
                        ).length;


                    // ==========================================
                    // RESOLVED
                    // ==========================================

                    const resolved =
                        complaints.filter(
                            (complaint) => {

                                const status =
                                    complaint.status
                                        ?.toUpperCase();

                                return (

                                    status ===
                                    "RESOLVED" ||

                                    status ===
                                    "CLOSED"

                                );

                            }
                        ).length;


                    // ==========================================
                    // UPDATE STATISTICS
                    // ==========================================

                    setStatistics({

                        total,

                        pending,

                        inProgress,

                        resolved

                    });

                }

            } catch (error) {

                console.error(
                    "Error loading citizen dashboard:",
                    error
                );


                setStatistics({
                    total: 0,
                    pending: 0,
                    inProgress: 0,
                    resolved: 0
                });

            } finally {

                setLoading(false);

            }

        };


        fetchStatistics();

    }, []);


    return (

        <div className="dashboard">

            <main className="content">


                {/* ================================
                    STATISTICS
                ================================= */}

                <div className="stats">

                    <DashboardCard

                        title="Total Complaints"

                        count={
                            loading
                                ? "..."
                                : statistics.total
                        }

                        icon={
                            <FaClipboardList />
                        }

                        color="#2563eb"

                    />


                    <DashboardCard

                        title="Pending"

                        count={
                            loading
                                ? "..."
                                : statistics.pending
                        }

                        icon={
                            <FaClock />
                        }

                        color="#f59e0b"

                    />


                    <DashboardCard

                        title="In Progress"

                        count={
                            loading
                                ? "..."
                                : statistics.inProgress
                        }

                        icon={
                            <FaSpinner />
                        }

                        color="#3b82f6"

                    />


                    <DashboardCard

                        title="Resolved"

                        count={
                            loading
                                ? "..."
                                : statistics.resolved
                        }

                        icon={
                            <FaCheckCircle />
                        }

                        color="#16a34a"

                    />

                </div>


                {/* ================================
                    TOOLBAR
                ================================= */}

                <div className="toolbar">

                    <input

                        className="search"

                        placeholder="Search Complaint..."

                    />


                    <button

                        className="new-btn"

                        onClick={() =>
                            navigate(
                                "/citizen/submit"
                            )
                        }

                    >

                        + New Complaint

                    </button>

                </div>


                {/* ================================
                    RECENT COMPLAINTS
                ================================= */}

                <RecentComplaints />


                {/* ================================
                    QUICK ACTIONS
                ================================= */}

                <QuickActions />


                {/* ================================
                    LATEST UPDATES
                ================================= */}

                <div className="bottom-section">

                    <div className="notification-card">

                        <h2>
                            Latest Updates
                        </h2>


                        <ul>

                            <li>
                                ✅ Road Complaint Assigned
                            </li>

                            <li>
                                🚰 Water Leakage Complaint Resolved
                            </li>

                            <li>
                                📢 Municipality issued new notice.
                            </li>

                            <li>
                                ⭐ Don't forget to submit feedback.
                            </li>

                        </ul>

                    </div>

                </div>

            </main>

        </div>

    );

}
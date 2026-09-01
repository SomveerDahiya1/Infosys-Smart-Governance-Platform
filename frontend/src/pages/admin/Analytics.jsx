import {
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaUsers,
    FaChartLine
} from "react-icons/fa";

import {
    useEffect,
    useState
} from "react";

import complaintService from "../../services/complaintService";

import "../../styles/admin/Analytics.css";

export default function Analytics() {
// ==========================================
// STATE
// ==========================================

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


const [loading, setLoading] =
    useState(true);


const [error, setError] =
    useState("");


// ==========================================
// FETCH ANALYTICS DATA
// ==========================================

useEffect(() => {

    const fetchAnalyticsData = async () => {

        try {

            setLoading(true);

            setError("");


            const [
                dashboardResponse,
                complaintsResponse
            ] = await Promise.all([

                complaintService
                    .getDashboardStatistics(),

                complaintService
                    .getAllComplaints()

            ]);


            // ==========================================
            // DASHBOARD STATISTICS
            // ==========================================

            if (dashboardResponse.success) {

                setDashboardData(
                    dashboardResponse.data
                );
            }


            // ==========================================
            // ALL COMPLAINTS
            // ==========================================

            if (complaintsResponse.success) {

                setComplaints(
                    complaintsResponse.data || []
                );
            }


        } catch (error) {

            console.error(
                "Error loading analytics:",
                error
            );


            setError(

                error.response?.data?.message ||

                "Failed to load analytics data"

            );


        } finally {

            setLoading(false);

        }

    };


    fetchAnalyticsData();


}, []);


// ==========================================
// CATEGORY ANALYTICS
// ==========================================

const categoryCounts =
    complaints.reduce(

        (result, complaint) => {

            const category =
                complaint.category ||
                "Uncategorized";


            if (!result[category]) {

                result[category] = 0;

            }


            result[category]++;


            return result;

        },

        {}

    );


const categoryAnalytics =
    Object.entries(categoryCounts)

        .map(

            ([category, count]) => ({

                category,

                count,

                percentage:

                    dashboardData.totalComplaints > 0

                        ? Math.round(

                            (
                                count /
                                dashboardData.totalComplaints
                            ) * 100

                        )

                        : 0

            })

        )

        .sort(

            (a, b) =>
                b.count - a.count

        );


// ==========================================
// RESOLUTION RATE
// ==========================================

const resolutionRate =

    dashboardData.totalComplaints > 0

        ? Math.round(

            (
                dashboardData.resolvedComplaints /
                dashboardData.totalComplaints
            ) * 100

        )

        : 0;


// ==========================================
// AVERAGE RESOLUTION TIME
// ==========================================

const resolvedComplaints =
    complaints.filter(

        complaint =>

            complaint.resolvedAt &&
            complaint.submittedAt

    );


let averageResolutionDays = 0;


if (resolvedComplaints.length > 0) {

    const totalResolutionTime =
        resolvedComplaints.reduce(

            (total, complaint) => {

                const submittedDate =
                    new Date(
                        complaint.submittedAt
                    );


                const resolvedDate =
                    new Date(
                        complaint.resolvedAt
                    );


                const difference =
                    resolvedDate -
                    submittedDate;


                const days =
                    difference /
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    );


                return total + days;

            },

            0

        );


    averageResolutionDays =
        totalResolutionTime /
        resolvedComplaints.length;

}


// ==========================================
// ACTIVE OFFICERS
// ==========================================

/*
 * For now we calculate officers
 * currently assigned to complaints.
 *
 * Later we can connect this to
 * Officer API for exact active officers.
 */

const activeOfficerIds =
    new Set();


complaints.forEach(

    complaint => {

        if (complaint.officerId) {

            activeOfficerIds.add(
                complaint.officerId
            );

        }

    }

);


const activeOfficers =
    activeOfficerIds.size;


// ==========================================
// LOADING
// ==========================================

if (loading) {

    return (

        <div className="analytics-page">

            <div className="analytics-header">

                <div>

                    <h1>
                        Loading Analytics...
                    </h1>

                    <p>
                        Please wait while we fetch
                        the latest CivicPulse data.
                    </p>

                </div>

            </div>

        </div>

    );

}


// ==========================================
// ERROR
// ==========================================

if (error) {

    return (

        <div className="analytics-page">

            <div className="analytics-header">

                <div>

                    <h1>
                        Unable to Load Analytics
                    </h1>

                    <p>
                        {error}
                    </p>

                </div>

            </div>

        </div>

    );

}


// ==========================================
// COLORS FOR CATEGORY BARS
// ==========================================

const progressColors = [

    "blue-fill",

    "green-fill",

    "orange-fill",

    "purple-fill"

];


// ==========================================
// UI
// ==========================================

return (

    <div className="analytics-page">


        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="analytics-header">

            <div>

                <h1>
                    Analytics Dashboard
                </h1>

                <p>
                    Monitor real-time complaint statistics
                    and CivicPulse platform performance.
                </p>

            </div>

        </div>


        {/* ==========================================
            STATISTICS
        ========================================== */}

        <div className="analytics-cards">


            {/* TOTAL COMPLAINTS */}

            <div className="analytics-card">

                <FaClipboardList
                    className="analytics-icon blue"
                />

                <h2>
                    {dashboardData.totalComplaints}
                </h2>

                <p>
                    Total Complaints
                </p>

            </div>


            {/* PENDING */}

            <div className="analytics-card">

                <FaClock
                    className="analytics-icon orange"
                />

                <h2>
                    {dashboardData.pendingComplaints}
                </h2>

                <p>
                    Pending Complaints
                </p>

            </div>


            {/* RESOLVED */}

            <div className="analytics-card">

                <FaCheckCircle
                    className="analytics-icon green"
                />

                <h2>
                    {dashboardData.resolvedComplaints}
                </h2>

                <p>
                    Resolved Complaints
                </p>

            </div>


            {/* ACTIVE OFFICERS */}

            <div className="analytics-card">

                <FaUsers
                    className="analytics-icon purple"
                />

                <h2>
                    {activeOfficers}
                </h2>

                <p>
                    Active Officers
                </p>

            </div>


        </div>


        {/* ==========================================
            CATEGORY ANALYTICS
        ========================================== */}

        <div className="analytics-section">


            <h2>
                Complaint Categories
            </h2>


            {categoryAnalytics.length > 0 ? (


                <div className="progress-list">


                    {categoryAnalytics.map(

                        (item, index) => (

                            <div
                                className="progress-item"

                                key={
                                    item.category
                                }
                            >


                                <span>

                                    {item.category}

                                </span>


                                <div className="progress-bar">


                                    <div

                                        className={
                                            `progress-fill ${
        progressColors[
        index %
        progressColors.length
            ]
    }`
                                        }

                                        style={{

                                            width:
                                                `${item.percentage}%`

                                        }}

                                    />


                                </div>


                                <strong>

                                    {item.count}

                                    {" ("}

                                    {item.percentage}

                                    {"%)"}

                                </strong>


                            </div>

                        )

                    )}


                </div>


            ) : (


                <p>

                    No complaint data available.

                </p>


            )}


        </div>


        {/* ==========================================
            STATUS OVERVIEW
        ========================================== */}

        <div className="analytics-section">


            <h2>
                Complaint Status Overview
            </h2>


            <div className="progress-list">


                <div className="progress-item">

                    <span>
                        Pending
                    </span>


                    <div className="progress-bar">

                        <div

                            className="progress-fill orange-fill"

                            style={{

                                width:

                                    dashboardData.totalComplaints > 0

                                        ? `${Math.round(
        (
            dashboardData.pendingComplaints /
            dashboardData.totalComplaints
        ) * 100
    )}%`

                                        : "0%"

                            }}

                        />

                    </div>


                    <strong>

                        {
                            dashboardData.pendingComplaints
                        }

                    </strong>

                </div>


                <div className="progress-item">

                    <span>
                        In Progress
                    </span>


                    <div className="progress-bar">

                        <div

                            className="progress-fill blue-fill"

                            style={{

                                width:

                                    dashboardData.totalComplaints > 0

                                        ? `${Math.round(
        (
            dashboardData.inProgressComplaints /
            dashboardData.totalComplaints
        ) * 100
    )}%`

                                        : "0%"

                            }}

                        />

                    </div>


                    <strong>

                        {
                            dashboardData.inProgressComplaints
                        }

                    </strong>

                </div>


                <div className="progress-item">

                    <span>
                        Resolved
                    </span>


                    <div className="progress-bar">

                        <div

                            className="progress-fill green-fill"

                            style={{

                                width:

                                    dashboardData.totalComplaints > 0

                                        ? `${Math.round(
        (
            dashboardData.resolvedComplaints /
            dashboardData.totalComplaints
        ) * 100
    )}%`

                                        : "0%"

                            }}

                        />

                    </div>


                    <strong>

                        {
                            dashboardData.resolvedComplaints
                        }

                    </strong>

                </div>


                <div className="progress-item">

                    <span>
                        Rejected
                    </span>


                    <div className="progress-bar">

                        <div

                            className="progress-fill purple-fill"

                            style={{

                                width:

                                    dashboardData.totalComplaints > 0

                                        ? `${Math.round(
        (
            dashboardData.rejectedComplaints /
            dashboardData.totalComplaints
        ) * 100
    )}%`

                                        : "0%"

                            }}

                        />

                    </div>


                    <strong>

                        {
                            dashboardData.rejectedComplaints
                        }

                    </strong>

                </div>


            </div>


        </div>


        {/* ==========================================
            PLATFORM PERFORMANCE
        ========================================== */}

        <div className="analytics-section">


            <h2>
                Platform Performance
            </h2>


            <div className="performance-grid">


                {/* RESOLUTION RATE */}

                <div className="performance-card">

                    <FaChartLine />

                    <h3>
                        Resolution Rate
                    </h3>

                    <h1>

                        {resolutionRate}%

                    </h1>

                </div>


                {/* AVG RESOLUTION TIME */}

                <div className="performance-card">

                    <FaClock />

                    <h3>
                        Avg Resolution Time
                    </h3>

                    <h1>

                        {averageResolutionDays.toFixed(1)}

                        {" Days"}

                    </h1>

                </div>


                {/* IN PROGRESS */}

                <div className="performance-card">

                    <FaUsers />

                    <h3>
                        In Progress
                    </h3>

                    <h1>

                        {
                            dashboardData.inProgressComplaints
                        }

                    </h1>

                </div>


            </div>


        </div>


    </div>

);
}

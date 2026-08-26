import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaClipboardList,
    FaUser,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaExclamationTriangle,
    FaUserCheck,
    FaSyncAlt,
    FaSearch,
    FaUsers,
    FaBriefcase
} from "react-icons/fa";

import complaintService from "../../services/complaintService";
import officerService from "../../services/officerService";

import "../../styles/admin/AdminComplaintDetails.css";


export default function AdminComplaintDetails() {

    const navigate = useNavigate();

    const { complaintId } = useParams();


    // ==========================================
    // STATE
    // ==========================================

    const [complaint, setComplaint] =
        useState(null);

    const [officers, setOfficers] =
        useState([]);

    const [selectedOfficerId, setSelectedOfficerId] =
        useState("");

    const [assignmentRemarks, setAssignmentRemarks] =
        useState("");

    const [officerSearch, setOfficerSearch] =
        useState("");

    const [sortByWorkload, setSortByWorkload] =
        useState(true);

    const [loading, setLoading] =
        useState(true);

    const [officersLoading, setOfficersLoading] =
        useState(true);

    const [assigning, setAssigning] =
        useState(false);

    const [error, setError] =
        useState("");

    const [assignmentError, setAssignmentError] =
        useState("");

    const [assignmentSuccess, setAssignmentSuccess] =
        useState("");


    // ==========================================
    // ADMIN USER ID
    // ==========================================

    const adminUserId =
        localStorage.getItem("userId");


    // ==========================================
    // FETCH COMPLAINT
    // ==========================================

    const fetchComplaint = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await complaintService
                    .getComplaintById(
                        complaintId
                    );


            if (response.success) {

                setComplaint(
                    response.data
                );

            } else {

                setError(
                    response.message ||
                    "Failed to load complaint"
                );

            }

        } catch (error) {

            console.error(
                "Error fetching complaint:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load complaint"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // FETCH OFFICERS
    // ==========================================

    const fetchOfficers = async () => {

        try {

            setOfficersLoading(true);

            setAssignmentError("");


            const response =
                await officerService
                    .getAllOfficers();


            if (response.success) {

                setOfficers(
                    response.data || []
                );

            } else {

                setAssignmentError(
                    response.message ||
                    "Failed to load officers"
                );

            }

        } catch (error) {

            console.error(
                "Error fetching officers:",
                error
            );

            setAssignmentError(
                error.response?.data?.message ||
                "Failed to load officers"
            );

        } finally {

            setOfficersLoading(false);

        }

    };


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {

        fetchComplaint();

        fetchOfficers();

    }, [complaintId]);


    // ==========================================
    // FILTER + SORT OFFICERS
    // ==========================================

    const filteredOfficers =
        officers
            .filter((officer) => {

                const search =
                    officerSearch
                        .trim()
                        .toLowerCase();


                if (!search) {
                    return true;
                }


                const fullName =
                    `${officer.firstName || ""} ${officer.lastName || ""}`
                        .toLowerCase();


                const email =
                    (
                        officer.email ||
                        ""
                    ).toLowerCase();


                const employeeCode =
                    (
                        officer.employeeCode ||
                        ""
                    ).toLowerCase();


                return (
                    fullName.includes(search) ||
                    email.includes(search) ||
                    employeeCode.includes(search)
                );

            })
            .sort((a, b) => {

                if (!sortByWorkload) {
                    return 0;
                }


                const workloadA =
                    Number(a.workload || 0);


                const workloadB =
                    Number(b.workload || 0);


                return workloadA - workloadB;

            });


    // ==========================================
    // HANDLE ASSIGN
    // ==========================================

    const handleAssignComplaint =
        async (event) => {

            event.preventDefault();


            if (!selectedOfficerId) {

                setAssignmentError(
                    "Please select an officer"
                );

                return;

            }


            if (!adminUserId) {

                setAssignmentError(
                    "Admin user information not found"
                );

                return;

            }


            try {

                setAssigning(true);

                setAssignmentError("");

                setAssignmentSuccess("");


                const assignmentData = {

                    officerId:
                        Number(selectedOfficerId),

                    assignmentRemarks:
                    assignmentRemarks

                };


                const response =
                    await complaintService
                        .assignComplaint(
                            complaintId,
                            adminUserId,
                            assignmentData
                        );


                if (response.success) {

                    setAssignmentSuccess(
                        response.message ||
                        "Complaint assigned successfully"
                    );


                    setSelectedOfficerId("");

                    setAssignmentRemarks("");


                    // Refresh complaint
                    await fetchComplaint();


                    // Refresh officer workload
                    await fetchOfficers();

                } else {

                    setAssignmentError(
                        response.message ||
                        "Failed to assign complaint"
                    );

                }

            } catch (error) {

                console.error(
                    "Error assigning complaint:",
                    error
                );

                setAssignmentError(
                    error.response?.data?.message ||
                    "Failed to assign complaint"
                );

            } finally {

                setAssigning(false);

            }

        };


    // ==========================================
    // STATUS CLASS
    // ==========================================

    const getStatusClass = (status) => {

        if (!status) {
            return "pending";
        }


        switch (
            status.toUpperCase()
            ) {

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


    // ==========================================
    // PRIORITY CLASS
    // ==========================================

    const getPriorityClass = (priority) => {

        if (!priority) {
            return "low";
        }


        switch (
            priority.toUpperCase()
            ) {

            case "HIGH":
                return "high";

            case "MEDIUM":
                return "medium";

            case "LOW":
                return "low";

            default:
                return "low";

        }

    };


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDateTime = (dateTime) => {

        if (!dateTime) {
            return "N/A";
        }


        try {

            return new Date(
                dateTime
            ).toLocaleString();

        } catch {

            return dateTime;

        }

    };


    // ==========================================
    // WORKLOAD CLASS
    // ==========================================

    const getWorkloadClass = (workload) => {

        const count =
            Number(workload || 0);


        if (count === 0) {
            return "workload-free";
        }

        if (count <= 3) {
            return "workload-low";
        }

        if (count <= 6) {
            return "workload-medium";
        }

        return "workload-high";
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="admin-complaint-page">

                <div className="admin-complaint-loading">

                    <FaClipboardList />

                    <h2>
                        Loading Complaint...
                    </h2>

                    <p>
                        Please wait while we fetch
                        the complaint details.
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error || !complaint) {

        return (

            <div className="admin-complaint-page">

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate(
                            "/admin/complaints"
                        )
                    }
                >

                    <FaArrowLeft />

                    Back to Complaints

                </button>


                <div className="admin-complaint-error">

                    <FaExclamationTriangle />

                    <h2>
                        Complaint Not Found
                    </h2>

                    <p>
                        {error ||
                            "The requested complaint could not be found."
                        }
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // DATA
    // ==========================================

    const complaintDisplayId =
        `CP${String(
            complaint.complaintId
        ).padStart(6, "0")}`;


    const isAssigned =
        complaint.assignedOfficerId;


    return (

        <div className="admin-complaint-page">


            {/* ==================================
                HEADER
            ================================== */}

            <div className="admin-complaint-header">

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate(
                            "/admin/complaints"
                        )
                    }
                >

                    <FaArrowLeft />

                    Back to Complaints

                </button>


                <div>

                    <h1>
                        Complaint Details
                    </h1>

                    <p>
                        View and manage complete
                        complaint information.
                    </p>

                </div>

            </div>


            {/* ==================================
                COMPLAINT HEADER CARD
            ================================== */}

            <div className="complaint-title-card">

                <div>

                    <span className="complaint-id">
                        {complaintDisplayId}
                    </span>

                    <h2>
                        {complaint.title ||
                            "Untitled Complaint"
                        }
                    </h2>

                </div>


                <div className="complaint-badges">

                    <span
                        className={
                            getPriorityClass(
                                complaint.priority
                            )
                        }
                    >

                        {complaint.priority ||
                            "LOW"
                        }

                    </span>


                    <span
                        className={
                            getStatusClass(
                                complaint.status
                            )
                        }
                    >

                        {complaint.status ||
                            "PENDING"
                        }

                    </span>

                </div>

            </div>


            {/* ==================================
                MAIN INFORMATION
            ================================== */}

            <div className="complaint-details-grid">


                {/* CITIZEN */}

                <div className="detail-card">

                    <div className="detail-card-title">

                        <FaUser />

                        <h3>
                            Citizen Information
                        </h3>

                    </div>


                    <div className="detail-row">

                        <span>
                            Name
                        </span>

                        <strong>
                            {complaint.citizenName ||
                                "N/A"
                            }
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Citizen ID
                        </span>

                        <strong>
                            {complaint.citizenId ||
                                "N/A"
                            }
                        </strong>

                    </div>

                </div>


                {/* COMPLAINT INFORMATION */}

                <div className="detail-card">

                    <div className="detail-card-title">

                        <FaClipboardList />

                        <h3>
                            Complaint Information
                        </h3>

                    </div>


                    <div className="detail-row">

                        <span>
                            Category
                        </span>

                        <strong>
                            {complaint.category ||
                                "N/A"
                            }
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Priority
                        </span>

                        <strong>
                            {complaint.priority ||
                                "N/A"
                            }
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Status
                        </span>

                        <strong>
                            {complaint.status ||
                                "N/A"
                            }
                        </strong>

                    </div>

                </div>


                {/* LOCATION */}

                <div className="detail-card">

                    <div className="detail-card-title">

                        <FaMapMarkerAlt />

                        <h3>
                            Location
                        </h3>

                    </div>


                    <div className="location-details">

                        {complaint.area && (
                            <p>
                                <strong>
                                    Area:
                                </strong>{" "}
                                {complaint.area}
                            </p>
                        )}


                        {complaint.addressLine && (
                            <p>
                                <strong>
                                    Address:
                                </strong>{" "}
                                {complaint.addressLine}
                            </p>
                        )}


                        {complaint.city && (
                            <p>
                                <strong>
                                    City:
                                </strong>{" "}
                                {complaint.city}
                            </p>
                        )}


                        {complaint.state && (
                            <p>
                                <strong>
                                    State:
                                </strong>{" "}
                                {complaint.state}
                            </p>
                        )}


                        {complaint.pincode && (
                            <p>
                                <strong>
                                    Pincode:
                                </strong>{" "}
                                {complaint.pincode}
                            </p>
                        )}

                    </div>

                </div>


                {/* TIMELINE */}

                <div className="detail-card">

                    <div className="detail-card-title">

                        <FaCalendarAlt />

                        <h3>
                            Timeline
                        </h3>

                    </div>


                    <div className="detail-row">

                        <span>
                            Submitted
                        </span>

                        <strong>
                            {formatDateTime(
                                complaint.submittedAt
                            )}
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Estimated Completion
                        </span>

                        <strong>
                            {formatDateTime(
                                complaint.estimatedCompletionDate
                            )}
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Resolved
                        </span>

                        <strong>
                            {complaint.resolvedAt
                                ? formatDateTime(
                                    complaint.resolvedAt
                                )
                                : "Not resolved"
                            }
                        </strong>

                    </div>


                    <div className="detail-row">

                        <span>
                            Closed
                        </span>

                        <strong>
                            {complaint.closedAt
                                ? formatDateTime(
                                    complaint.closedAt
                                )
                                : "Not closed"
                            }
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==================================
                DESCRIPTION
            ================================== */}

            <div className="description-card">

                <div className="detail-card-title">

                    <FaClipboardList />

                    <h3>
                        Complaint Description
                    </h3>

                </div>


                <p>
                    {complaint.description ||
                        "No description provided."
                    }
                </p>

            </div>


            {/* ==================================
                CURRENT ASSIGNMENT
            ================================== */}

            {isAssigned && (

                <div className="current-assignment-card">

                    <div className="detail-card-title">

                        <FaUserCheck />

                        <div>

                            <h3>
                                Current Assignment
                            </h3>

                            <p>
                                This complaint is currently
                                assigned to an officer.
                            </p>

                        </div>

                    </div>


                    <div className="assignment-details-grid">

                        <div className="detail-row">

                            <span>
                                Assigned Officer
                            </span>

                            <strong>
                                {complaint.assignedOfficerName ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="detail-row">

                            <span>
                                Officer Email
                            </span>

                            <strong>
                                {complaint.assignedOfficerEmail ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="detail-row">

                            <span>
                                Assigned By
                            </span>

                            <strong>
                                {complaint.assignedByName ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="detail-row">

                            <span>
                                Assigned At
                            </span>

                            <strong>
                                {formatDateTime(
                                    complaint.assignedAt
                                )}
                            </strong>

                        </div>

                    </div>


                    {complaint.assignmentRemarks && (

                        <div className="assignment-remarks-display">

                            <span>
                                Assignment Remarks
                            </span>

                            <p>
                                {complaint.assignmentRemarks}
                            </p>

                        </div>

                    )}

                </div>

            )}


            {/* ==================================
                ASSIGN / REASSIGN
            ================================== */}

            <div className="assignment-card">

                <div className="detail-card-title">

                    <FaUserCheck />

                    <div>

                        <h3>

                            {isAssigned
                                ? "Reassign Complaint"
                                : "Assign Complaint"
                            }

                        </h3>

                        <p>

                            {isAssigned
                                ? "Assign this complaint to another officer."
                                : "Select an officer to handle this complaint."
                            }

                        </p>

                    </div>

                </div>


                {/* ==================================
                    OFFICER SEARCH
                ================================== */}

                <div className="officer-selection-header">

                    <div>

                        <label>
                            Select Officer
                        </label>

                        <p className="officer-selection-info">

                            <FaUsers />

                            {filteredOfficers.length} officers available

                        </p>

                    </div>


                    <button
                        type="button"
                        className={
                            sortByWorkload
                                ? "workload-sort-btn active"
                                : "workload-sort-btn"
                        }
                        onClick={() =>
                            setSortByWorkload(
                                !sortByWorkload
                            )
                        }
                    >

                        <FaBriefcase />

                        {sortByWorkload
                            ? "Lowest Workload First"
                            : "Default Order"
                        }

                    </button>

                </div>


                <div className="officer-search-box">

                    <FaSearch />

                    <input
                        type="text"
                        value={officerSearch}
                        onChange={(event) =>
                            setOfficerSearch(
                                event.target.value
                            )
                        }
                        placeholder="Search officer by name, email or employee code..."
                        disabled={
                            officersLoading ||
                            assigning
                        }
                    />

                </div>


                {/* ==================================
                    OFFICER LIST
                ================================== */}

                {!officersLoading &&
                    filteredOfficers.length > 0 && (

                        <div className="officer-list">

                            {filteredOfficers.map(
                                (officer) => {

                                    const workload =
                                        Number(
                                            officer.workload || 0
                                        );


                                    const fullName =
                                        `${officer.firstName || ""} ${officer.lastName || ""}`
                                            .trim();


                                    const selected =
                                        String(
                                            selectedOfficerId
                                        ) === String(
                                            officer.officerId
                                        );


                                    return (

                                        <button
                                            key={
                                                officer.officerId
                                            }
                                            type="button"
                                            className={
                                                selected
                                                    ? "officer-item selected"
                                                    : "officer-item"
                                            }
                                            onClick={() =>
                                                setSelectedOfficerId(
                                                    String(
                                                        officer.officerId
                                                    )
                                                )
                                            }
                                            disabled={
                                                assigning
                                            }
                                        >

                                            <div className="officer-avatar">

                                                <FaUser />

                                            </div>


                                            <div className="officer-info">

                                                <strong>

                                                    {fullName ||
                                                        "Unknown Officer"
                                                    }

                                                </strong>


                                                <span>

                                                    {officer.employeeCode
                                                        ? officer.employeeCode
                                                        : "No employee code"
                                                    }

                                                    {" • "}

                                                    {officer.email ||
                                                        "No email"
                                                    }

                                                </span>

                                            </div>


                                            <div
                                                className={
                                                    `officer-workload ${getWorkloadClass(
                                                        workload
                                                    )}`
                                                }
                                            >

                                                <span>
                                                    Workload
                                                </span>

                                                <strong>
                                                    {workload}
                                                </strong>

                                                <small>
                                                    active
                                                </small>

                                            </div>

                                        </button>

                                    );

                                }
                            )}

                        </div>

                    )}


                {/* NO OFFICERS */}

                {!officersLoading &&
                    filteredOfficers.length === 0 && (

                        <div className="no-officers">

                            <FaUsers />

                            <p>
                                No officers found.
                            </p>

                            <small>
                                Try another search.
                            </small>

                        </div>

                    )}


                {/* ==================================
                    FORM
                ================================== */}

                <form
                    className="assignment-form"
                    onSubmit={
                        handleAssignComplaint
                    }
                >


                    {/* SELECTED OFFICER */}

                    <div className="assignment-field">

                        <label>
                            Selected Officer
                        </label>


                        <select
                            value={
                                selectedOfficerId
                            }
                            onChange={(event) =>
                                setSelectedOfficerId(
                                    event.target.value
                                )
                            }
                            disabled={
                                officersLoading ||
                                assigning
                            }
                        >

                            <option value="">

                                {officersLoading
                                    ? "Loading officers..."
                                    : "Select an officer"
                                }

                            </option>


                            {officers.map(
                                (officer) => (

                                    <option
                                        key={
                                            officer.officerId
                                        }
                                        value={
                                            officer.officerId
                                        }
                                    >

                                        {officer.firstName}{" "}
                                        {officer.lastName || ""}

                                        {" — Workload: "}

                                        {officer.workload || 0}

                                        {officer.employeeCode
                                            ? ` (${officer.employeeCode})`
                                            : ""
                                        }

                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* REMARKS */}

                    <div className="assignment-field">

                        <label>
                            Assignment Remarks
                        </label>


                        <textarea
                            value={
                                assignmentRemarks
                            }
                            onChange={(event) =>
                                setAssignmentRemarks(
                                    event.target.value
                                )
                            }
                            placeholder="Add instructions or remarks for the officer..."
                            rows="4"
                            disabled={
                                assigning
                            }
                        />

                    </div>


                    {/* ERROR */}

                    {assignmentError && (

                        <div className="assignment-error">

                            {assignmentError}

                        </div>

                    )}


                    {/* SUCCESS */}

                    {assignmentSuccess && (

                        <div className="assignment-success">

                            {assignmentSuccess}

                        </div>

                    )}


                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="assign-btn"
                        disabled={
                            assigning ||
                            officersLoading ||
                            !selectedOfficerId
                        }
                    >

                        {assigning ? (

                            <>

                                <FaSyncAlt
                                    className="spin"
                                />

                                Assigning...

                            </>

                        ) : (

                            <>

                                <FaUserCheck />

                                {isAssigned
                                    ? "Reassign Complaint"
                                    : "Assign Complaint"
                                }

                            </>

                        )}

                    </button>

                </form>

            </div>

        </div>

    );

}
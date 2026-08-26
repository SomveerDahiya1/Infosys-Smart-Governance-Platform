import { useEffect, useState } from "react";

import {
    FaSearch,
    FaFilter,
    FaArrowRight,
    FaClipboardList,
    FaTimes
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import complaintService from "../../services/complaintService";

import "../../styles/admin/ManageComplaints.css";


export default function ManageComplaints() {

    const navigate = useNavigate();


    // ==========================================
    // STATE
    // ==========================================

    const [search, setSearch] =
        useState("");

    const [complaints, setComplaints] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // FILTER STATE
    // ==========================================

    const [showFilters, setShowFilters] =
        useState(false);

    const [statusId, setStatusId] =
        useState("");

    const [priorityId, setPriorityId] =
        useState("");

    const [categoryId, setCategoryId] =
        useState("");


    // ==========================================
    // FETCH ALL COMPLAINTS
    // ==========================================

    const fetchComplaints = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await complaintService.getAllComplaints();

            if (response.success) {

                setComplaints(
                    response.data || []
                );

            } else {

                setError(
                    response.message ||
                    "Failed to load complaints"
                );
            }

        } catch (error) {

            console.error(
                "Error fetching complaints:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load complaints"
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {

        fetchComplaints();

    }, []);


    // ==========================================
    // APPLY FILTER
    // ==========================================

    const handleApplyFilters = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await complaintService.filterComplaints(
                    statusId,
                    priorityId,
                    categoryId
                );

            if (response.success) {

                setComplaints(
                    response.data || []
                );

            } else {

                setError(
                    response.message ||
                    "Failed to filter complaints"
                );
            }

        } catch (error) {

            console.error(
                "Error filtering complaints:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to filter complaints"
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // CLEAR FILTERS
    // ==========================================

    const handleClearFilters = async () => {

        setStatusId("");
        setPriorityId("");
        setCategoryId("");

        try {

            setLoading(true);
            setError("");

            const response =
                await complaintService.getAllComplaints();

            if (response.success) {

                setComplaints(
                    response.data || []
                );

            } else {

                setError(
                    response.message ||
                    "Failed to load complaints"
                );
            }

        } catch (error) {

            console.error(
                "Error clearing filters:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load complaints"
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // SEARCH
    // ==========================================

    const filtered =
        complaints.filter((complaint) => {

            const searchText =
                search.toLowerCase().trim();


            if (!searchText) {
                return true;
            }


            const complaintId =
                `CP${String(
                    complaint.complaintId
                ).padStart(6, "0")}`;


            const citizen =
                String(
                    complaint.citizenName || ""
                );


            const category =
                String(
                    complaint.category || ""
                );


            const title =
                String(
                    complaint.title || ""
                );


            const area =
                String(
                    complaint.area || ""
                );


            const city =
                String(
                    complaint.city || ""
                );


            const status =
                String(
                    complaint.status || ""
                );


            const priority =
                String(
                    complaint.priority || ""
                );


            return (

                complaintId
                    .toLowerCase()
                    .includes(searchText)

                ||

                String(
                    complaint.complaintId || ""
                )
                    .toLowerCase()
                    .includes(searchText)

                ||

                citizen
                    .toLowerCase()
                    .includes(searchText)

                ||

                category
                    .toLowerCase()
                    .includes(searchText)

                ||

                title
                    .toLowerCase()
                    .includes(searchText)

                ||

                area
                    .toLowerCase()
                    .includes(searchText)

                ||

                city
                    .toLowerCase()
                    .includes(searchText)

                ||

                status
                    .toLowerCase()
                    .includes(searchText)

                ||

                priority
                    .toLowerCase()
                    .includes(searchText)
            );
        });


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
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="complaints-page">

                <div className="complaints-header">

                    <div>

                        <h1>
                            Manage Complaints
                        </h1>

                        <p>
                            Loading complaints...
                        </p>

                    </div>

                </div>

                <div className="empty-state">

                    <FaClipboardList />

                    <h2>
                        Loading Complaints
                    </h2>

                    <p>
                        Please wait while we fetch
                        the latest complaints.
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div className="complaints-page">

                <div className="complaints-header">

                    <div>

                        <h1>
                            Manage Complaints
                        </h1>

                        <p>
                            View and monitor all
                            complaints across the city.
                        </p>

                    </div>

                </div>

                <div className="empty-state">

                    <FaClipboardList />

                    <h2>
                        Unable to Load Complaints
                    </h2>

                    <p>
                        {error}
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (

        <div className="complaints-page">


            {/* ==================================
                HEADER
            ================================== */}

            <div className="complaints-header">

                <div>

                    <h1>
                        Manage Complaints
                    </h1>

                    <p>
                        View and monitor all complaints
                        across the city.
                    </p>

                </div>

            </div>


            {/* ==================================
                TOOLBAR
            ================================== */}

            <div className="complaints-toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search complaint..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>


                <button
                    className="filter-btn"
                    onClick={() =>
                        setShowFilters(
                            !showFilters
                        )
                    }
                >

                    {showFilters ? (
                        <FaTimes />
                    ) : (
                        <FaFilter />
                    )}

                    {showFilters
                        ? "Close"
                        : "Filter"
                    }

                </button>

            </div>


            {/* ==================================
                FILTER PANEL
            ================================== */}

            {showFilters && (

                <div className="filter-panel">

                    <div className="filter-header">

                        <div>

                            <h3>
                                Filter Complaints
                            </h3>

                            <p>
                                Narrow down complaints
                                using the available filters.
                            </p>

                        </div>

                    </div>


                    <div className="filter-fields">


                        {/* STATUS */}

                        <div className="filter-field">

                            <label>
                                Status
                            </label>

                            <select
                                value={statusId}
                                onChange={(e) =>
                                    setStatusId(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Statuses
                                </option>

                                <option value="1">
                                    Pending
                                </option>

                                <option value="2">
                                    Assigned
                                </option>

                                <option value="3">
                                    In Progress
                                </option>

                                <option value="4">
                                    Resolved
                                </option>

                                <option value="5">
                                    Closed
                                </option>

                            </select>

                        </div>


                        {/* PRIORITY */}

                        <div className="filter-field">

                            <label>
                                Priority
                            </label>

                            <select
                                value={priorityId}
                                onChange={(e) =>
                                    setPriorityId(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Priorities
                                </option>

                                <option value="1">
                                    Low
                                </option>

                                <option value="2">
                                    Medium
                                </option>

                                <option value="3">
                                    High
                                </option>

                            </select>

                        </div>


                        {/* CATEGORY */}

                        <div className="filter-field">

                            <label>
                                Category
                            </label>

                            <select
                                value={categoryId}
                                onChange={(e) =>
                                    setCategoryId(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Categories
                                </option>

                                <option value="1">
                                    Road
                                </option>

                                <option value="2">
                                    Water
                                </option>

                                <option value="3">
                                    Sanitation
                                </option>

                                <option value="4">
                                    Electricity
                                </option>

                                <option value="5">
                                    Drainage
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* FILTER ACTIONS */}

                    <div className="filter-actions">

                        <button
                            className="clear-filter-btn"
                            onClick={
                                handleClearFilters
                            }
                        >
                            Clear Filters
                        </button>

                        <button
                            className="apply-filter-btn"
                            onClick={
                                handleApplyFilters
                            }
                        >
                            Apply Filters
                        </button>

                    </div>

                </div>
            )}


            {/* ==================================
                TABLE
            ================================== */}

            {filtered.length > 0 ? (

                <div className="complaints-table">

                    <table>

                        <thead>

                        <tr>

                            <th>
                                ID
                            </th>

                            <th>
                                Citizen
                            </th>

                            <th>
                                Category
                            </th>

                            <th>
                                Location
                            </th>

                            <th>
                                Priority
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                        </thead>


                        <tbody>

                        {filtered.map(
                            (complaint) => {

                                const complaintId =
                                    `CP${String(
                                        complaint.complaintId
                                    ).padStart(
                                        6,
                                        "0"
                                    )}`;


                                return (

                                    <tr
                                        key={
                                            complaint.complaintId
                                        }
                                    >

                                        <td>
                                            {complaintId}
                                        </td>


                                        <td>
                                            {
                                                complaint.citizenName ||
                                                "Unknown Citizen"
                                            }
                                        </td>


                                        <td>
                                            {
                                                complaint.category ||
                                                "N/A"
                                            }
                                        </td>


                                        <td>

                                            {
                                                complaint.area ||
                                                complaint.city ||
                                                complaint.addressLine ||
                                                "N/A"
                                            }

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    getPriorityClass(
                                                        complaint.priority
                                                    )
                                                }
                                            >

                                                {
                                                    complaint.priority ||
                                                    "LOW"
                                                }

                                            </span>

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
                                                className="open-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/complaints/${complaint.complaintId}`
                                                    )
                                                }
                                            >

                                                Open

                                                <FaArrowRight />

                                            </button>

                                        </td>

                                    </tr>

                                );
                            }
                        )}

                        </tbody>

                    </table>

                </div>

            ) : (

                <div className="empty-state">

                    <FaClipboardList />

                    <h2>
                        No Complaints Found
                    </h2>

                    <p>

                        {search
                            ? "Try another keyword."
                            : "There are no complaints matching the selected filters."
                        }

                    </p>

                </div>

            )}

        </div>
    );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaSearch,
    FaFilter,
    FaArrowRight,
    FaClipboardList
} from "react-icons/fa";

import "../../styles/officer/AssignedComplaints.css";

export default function AssignedComplaints() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const complaints = [
        {
            id: "CP2026001",
            category: "Road Damage",
            location: "Sector 14",
            priority: "High",
            status: "Pending"
        },
        {
            id: "CP2026002",
            category: "Water Leakage",
            location: "Sector 21",
            priority: "Medium",
            status: "In Progress"
        },
        {
            id: "CP2026003",
            category: "Street Light",
            location: "Sector 10",
            priority: "Low",
            status: "Resolved"
        },
        {
            id: "CP2026004",
            category: "Garbage",
            location: "Sector 45",
            priority: "High",
            status: "Pending"
        },
        {
            id: "CP2026005",
            category: "Drainage",
            location: "Sector 7",
            priority: "Medium",
            status: "In Progress"
        }
    ];

    const filteredComplaints = complaints.filter((complaint) =>
        complaint.id.toLowerCase().includes(search.toLowerCase()) ||
        complaint.category.toLowerCase().includes(search.toLowerCase()) ||
        complaint.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="assigned-page">
            <div className="assigned-header">
                <div>
                    <h1>Assigned Complaints</h1>

                    <p>
                        Manage all complaints assigned to you.
                    </p>
                </div>
            </div>

            <div className="assigned-toolbar">
                <div className="search-box">
                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search Complaint..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <button className="filter-btn">
                    <FaFilter />

                    Filter
                </button>
            </div>

            <div className="assigned-table">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredComplaints.map((complaint) => (
                        <tr key={complaint.id}>
                            <td>{complaint.id}</td>

                            <td>{complaint.category}</td>

                            <td>{complaint.location}</td>

                            <td>
                                    <span className={complaint.priority.toLowerCase()}>
                                        {complaint.priority}
                                    </span>
                            </td>

                            <td>
                                    <span
                                        className={
                                            complaint.status === "Pending"
                                                ? "pending"
                                                : complaint.status === "Resolved"
                                                    ? "resolved"
                                                    : "progress"
                                        }
                                    >
                                        {complaint.status}
                                    </span>
                            </td>

                            <td>
                                <button
                                    className="open-btn"
                                    onClick={() =>
                                        navigate(`/officer/complaint/${complaint.id}`)
                                    }
                                >
                                    Open

                                    <FaArrowRight />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {filteredComplaints.length === 0 && (
                <div className="empty-state">
                    <FaClipboardList />

                    <h2>No Complaints Found</h2>

                    <p>
                        Try another keyword.
                    </p>
                </div>
            )}
        </div>
    );
}
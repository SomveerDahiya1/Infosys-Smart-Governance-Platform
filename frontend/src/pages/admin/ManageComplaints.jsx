import { useState } from "react";
import {
    FaSearch,
    FaFilter,
    FaArrowRight,
    FaClipboardList
} from "react-icons/fa";
import "../../styles/admin/ManageComplaints.css";

export default function ManageComplaints() {
    const [search, setSearch] = useState("");

    const complaints = [
        {
            id: "CP2026001",
            citizen: "Somveer Dahiya",
            category: "Road Damage",
            location: "Sector 14",
            priority: "High",
            status: "Pending"
        },
        {
            id: "CP2026002",
            citizen: "Rahul Sharma",
            category: "Water Leakage",
            location: "Sector 21",
            priority: "Medium",
            status: "In Progress"
        },
        {
            id: "CP2026003",
            citizen: "Amit Kumar",
            category: "Street Light",
            location: "Sector 8",
            priority: "Low",
            status: "Resolved"
        },
        {
            id: "CP2026004",
            citizen: "Rohit Singh",
            category: "Garbage",
            location: "Sector 45",
            priority: "High",
            status: "Pending"
        },
        {
            id: "CP2026005",
            citizen: "Anjali Verma",
            category: "Drainage",
            location: "Sector 7",
            priority: "Medium",
            status: "Resolved"
        }
    ];

    const filtered = complaints.filter((complaint) =>
        complaint.id.toLowerCase().includes(search.toLowerCase()) ||
        complaint.citizen.toLowerCase().includes(search.toLowerCase()) ||
        complaint.category.toLowerCase().includes(search.toLowerCase()) ||
        complaint.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="complaints-page">
            {/* Header */}
            <div className="complaints-header">
                <div>
                    <h1>Manage Complaints</h1>
                    <p>
                        View and monitor all complaints across the city.
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="complaints-toolbar">
                <div className="search-box">
                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search complaint..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <button className="filter-btn">
                    <FaFilter />
                    Filter
                </button>
            </div>

            {/* Table */}
            <div className="complaints-table">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Citizen</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filtered.map((complaint) => (
                        <tr key={complaint.id}>
                            <td>{complaint.id}</td>
                            <td>{complaint.citizen}</td>
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
                                <button className="open-btn">
                                    Open
                                    <FaArrowRight />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {filtered.length === 0 && (
                <div className="empty-state">
                    <FaClipboardList />
                    <h2>No Complaints Found</h2>
                    <p>Try another keyword.</p>
                </div>
            )}
        </div>
    );
}
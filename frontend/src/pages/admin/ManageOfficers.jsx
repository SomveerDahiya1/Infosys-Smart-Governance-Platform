import { useState } from "react";
import {
    FaUserPlus,
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";
import "../../styles/admin/ManageOfficers.css";

export default function ManageOfficers() {
    const [search, setSearch] = useState("");

    const officers = [
        {
            id: "OF001",
            name: "Rahul Sharma",
            department: "Road",
            phone: "+91 9876543210",
            complaints: 32,
            status: "Active"
        },
        {
            id: "OF002",
            name: "Amit Kumar",
            department: "Water",
            phone: "+91 9123456780",
            complaints: 18,
            status: "Active"
        },
        {
            id: "OF003",
            name: "Rohit Singh",
            department: "Electricity",
            phone: "+91 9988776655",
            complaints: 25,
            status: "Inactive"
        },
        {
            id: "OF004",
            name: "Deepak Verma",
            department: "Drainage",
            phone: "+91 9012345678",
            complaints: 15,
            status: "Active"
        }
    ];

    const filtered = officers.filter((officer) =>
        officer.name.toLowerCase().includes(search.toLowerCase()) ||
        officer.department.toLowerCase().includes(search.toLowerCase()) ||
        officer.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="manage-page">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1>Manage Officers</h1>
                    <p>
                        Add, update and monitor officers.
                    </p>
                </div>

                <button className="add-btn">
                    <FaUserPlus />
                    Add Officer
                </button>
            </div>

            {/* Search */}
            <div className="toolbar">
                <input
                    type="text"
                    placeholder="Search officer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="table-card">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Phone</th>
                        <th>Assigned</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filtered.map((officer) => (
                        <tr key={officer.id}>
                            <td>{officer.id}</td>
                            <td>{officer.name}</td>
                            <td>{officer.department}</td>
                            <td>{officer.phone}</td>
                            <td>{officer.complaints}</td>

                            <td>
                                    <span
                                        className={
                                            officer.status === "Active"
                                                ? "active"
                                                : "inactive"
                                        }
                                    >
                                        {officer.status}
                                    </span>
                            </td>

                            <td>
                                <div className="actions">
                                    <button>
                                        <FaEye />
                                    </button>

                                    <button>
                                        <FaEdit />
                                    </button>

                                    <button>
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
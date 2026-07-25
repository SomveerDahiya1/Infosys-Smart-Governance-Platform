import "../../styles/common/Table.css";
import { useNavigate } from "react-router-dom";

export default function ComplaintTable() {
    const navigate = useNavigate();

    return (
        <div className="table-card">
            <div className="table-header">
                <h2>Recent Complaints</h2>

                <button
                    className="view-all-btn"
                    onClick={() => navigate("/citizen/track")}
                >
                    View All
                </button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>CP001</td>
                    <td>Road Damage</td>
                    <td>Road</td>
                    <td>
                        <span className="high">High</span>
                    </td>
                    <td>
                        <span className="pending">Pending</span>
                    </td>
                    <td>
                        <button className="action-btn">View</button>
                    </td>
                </tr>

                <tr>
                    <td>CP002</td>
                    <td>Water Leakage</td>
                    <td>Water</td>
                    <td>
                        <span className="medium">Medium</span>
                    </td>
                    <td>
                        <span className="progress">In Progress</span>
                    </td>
                    <td>
                        <button className="action-btn">View</button>
                    </td>
                </tr>

                <tr>
                    <td>CP003</td>
                    <td>Garbage Collection</td>
                    <td>Sanitation</td>
                    <td>
                        <span className="low">Low</span>
                    </td>
                    <td>
                        <span className="resolved">Resolved</span>
                    </td>
                    <td>
                        <button className="action-btn">View</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
import {
    FaPlusCircle,
    FaSearchLocation,
    FaCommentDots
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/common/Dashboard.css";

export default function QuickActions() {
    const navigate = useNavigate();

    return (
        <div className="quick-actions">
            <div className="quick-card">
                <FaPlusCircle />
                <h3>New Complaint</h3>
                <p>Register a new civic issue.</p>

                <button onClick={() => navigate("/citizen/submit")}>
                    + Create
                </button>
            </div>

            <div className="quick-card">
                <FaSearchLocation />
                <h3>Track Complaint</h3>
                <p>Check complaint status.</p>

                <button onClick={() => navigate("/citizen/track")}>
                    Track Complaint
                </button>
            </div>

            <div className="quick-card">
                <FaCommentDots />
                <h3>Feedback</h3>
                <p>Rate our services.</p>

                <button onClick={() => navigate("/citizen/feedback")}>
                    Give Feedback
                </button>
            </div>
        </div>
    );
}
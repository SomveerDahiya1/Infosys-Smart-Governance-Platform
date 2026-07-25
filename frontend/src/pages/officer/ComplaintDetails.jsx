import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaUser,
    FaPhone,
    FaEnvelope,
    FaImage,
    FaSave
} from "react-icons/fa";

import "../../styles/officer/ComplaintDetails.css";

export default function ComplaintDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [status, setStatus] = useState("Pending");
    const [remarks, setRemarks] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState(null);

    return (
        <div className="complaint-details">
            <button
                className="back-btn"
                onClick={() => navigate("/officer/assigned")}
            >
                <FaArrowLeft />

                Back
            </button>

            <div className="details-header">
                <div>
                    <h1>{id}</h1>

                    <p>
                        Complaint Details
                    </p>
                </div>

                <span className="pending">
                    {status}
                </span>
            </div>

            <div className="details-card">
                <h2>Citizen Information</h2>

                <div className="info-grid">
                    <div>
                        <FaUser />

                        <span>
                            Somveer Dahiya
                        </span>
                    </div>

                    <div>
                        <FaPhone />

                        <span>
                            +91 98XXXXXXXX
                        </span>
                    </div>

                    <div>
                        <FaEnvelope />

                        <span>
                            somveer@gmail.com
                        </span>
                    </div>
                </div>
            </div>

            <div className="details-card">
                <h2>Complaint Information</h2>

                <div className="info-grid">
                    <div>
                        <strong>Category</strong>

                        <p>
                            Road Damage
                        </p>
                    </div>

                    <div>
                        <strong>Priority</strong>

                        <p>
                            High
                        </p>
                    </div>

                    <div>
                        <strong>Location</strong>

                        <p>
                            <FaMapMarkerAlt />

                            Sector 14 Gurgaon
                        </p>
                    </div>

                    <div>
                        <strong>Date</strong>

                        <p>
                            <FaCalendarAlt />

                            23 July 2026
                        </p>
                    </div>
                </div>

                <div className="description">
                    <strong>Description</strong>

                    <p>
                        Large potholes are present on the main road
                        causing traffic issues and accidents.
                        Kindly repair the road as soon as possible.
                    </p>
                </div>
            </div>

            <div className="details-card">
                <h2>Evidence</h2>

                <div className="evidence-box">
                    <FaImage />

                    <p>
                        Dummy Image
                    </p>
                </div>
            </div>

            <div className="details-card">
                <h2>Timeline</h2>

                <ul className="timeline">
                    <li>
                        Complaint Submitted
                    </li>

                    <li>
                        Assigned to Officer
                    </li>

                    <li>
                        Waiting for Action
                    </li>
                </ul>
            </div>

            <div className="details-card">
                <h2>Update Complaint</h2>

                <div className="form-group">
                    <label>Status</label>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>
                            Pending
                        </option>

                        <option>
                            In Progress
                        </option>

                        <option>
                            Resolved
                        </option>
                    </select>
                </div>

                <div className="form-group">
                    <label>
                        Estimated Completion
                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>
                        Officer Remarks
                    </label>

                    <textarea
                        rows="5"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Write remarks..."
                    />
                </div>

                <div className="form-group">
                    <label>
                        Upload Work Image
                    </label>

                    <input
                        type="file"
                        onChange={(e) => {
                            if (e.target.files[0]) {
                                setImage(
                                    URL.createObjectURL(e.target.files[0])
                                );
                            }
                        }}
                    />
                </div>

                {image && (
                    <img
                        src={image}
                        alt="preview"
                        className="preview-image"
                    />
                )}

                <button className="save-btn">
                    <FaSave />

                    Save Update
                </button>
            </div>
        </div>
    );
}
import "../../styles/common/Forms.css";

export default function TrackComplaint() {
    return (
        <div className="form-page">
            <div className="form-container">
                <h1>Track Complaint</h1>

                <p className="subtitle">
                    Track the current status of your complaint.
                </p>

                {/* Search Card */}
                <div className="section-card">
                    <h2>Search Complaint</h2>

                    <div className="track-search">
                        <input
                            type="text"
                            placeholder="Enter Complaint ID (CP2026001)"
                        />

                        <button className="submit-btn">
                            Search
                        </button>
                    </div>
                </div>

                {/* Complaint Details */}
                <div className="section-card">
                    <h2>Complaint Details</h2>

                    <div className="details-grid">
                        <div>
                            <strong>Complaint ID</strong>
                            <p>CP2026001</p>
                        </div>

                        <div>
                            <strong>Category</strong>
                            <p>Road</p>
                        </div>

                        <div>
                            <strong>Priority</strong>
                            <p className="high">High</p>
                        </div>

                        <div>
                            <strong>Status</strong>
                            <p className="progress">In Progress</p>
                        </div>
                    </div>
                </div>

                {/* Status Timeline */}
                <div className="section-card">
                    <h2>Complaint Progress</h2>

                    <div className="timeline">
                        <div className="timeline-item completed">
                            <div className="circle"></div>

                            <div>
                                <h4>Complaint Submitted</h4>

                                <p>
                                    09 Jul 2026 • 10:30 AM
                                </p>
                            </div>
                        </div>

                        <div className="timeline-item completed">
                            <div className="circle"></div>

                            <div>
                                <h4>Assigned To Officer</h4>

                                <p>
                                    09 Jul 2026 • 11:15 AM
                                </p>
                            </div>
                        </div>

                        <div className="timeline-item active">
                            <div className="circle"></div>

                            <div>
                                <h4>Work In Progress</h4>

                                <p>
                                    Expected Completion : Tomorrow
                                </p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="circle"></div>

                            <div>
                                <h4>Resolved</h4>

                                <p>
                                    Waiting...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assigned Officer */}
                <div className="section-card">
                    <h2>Assigned Officer</h2>

                    <div className="details-grid">
                        <div>
                            <strong>Name</strong>
                            <p>Rahul Sharma</p>
                        </div>

                        <div>
                            <strong>Department</strong>
                            <p>Road Maintenance</p>
                        </div>

                        <div>
                            <strong>Contact</strong>
                            <p>9876543210</p>
                        </div>

                        <div>
                            <strong>Email</strong>
                            <p>rahul@civicpulse.gov</p>
                        </div>
                    </div>
                </div>

                {/* Complaint Evidence */}
                <div className="section-card">
                    <h2>Complaint Evidence</h2>

                    <img
                        className="complaint-image"
                        src="https://picsum.photos/700/350"
                        alt="Complaint"
                    />
                </div>

                {/* Officer Remarks */}
                <div className="section-card">
                    <h2>Officer Remarks</h2>

                    <p>
                        Our maintenance team has inspected the damaged road.
                        Repair work has already started and is expected to
                        finish within the next 24 hours.
                    </p>
                </div>
            </div>
        </div>
    );
}
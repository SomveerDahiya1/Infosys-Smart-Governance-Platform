import "../../styles/common/Forms.css";

export default function CitizenNotifications() {
    return (
        <div className="form-page">
            <div className="form-container">
                <h1>Notifications</h1>

                <p className="subtitle">
                    Stay updated with all your complaint activities.
                </p>

                {/* Filter Buttons */}
                <div className="notification-filter">
                    <button className="active-filter">
                        All
                    </button>

                    <button>
                        Unread
                    </button>

                    <button>
                        Read
                    </button>
                </div>

                {/* Notification 1 */}
                <div className="notification-card success">
                    <div className="notification-icon">
                        🟢
                    </div>

                    <div className="notification-content">
                        <div className="notification-header">
                            <h3>Complaint Assigned</h3>

                            <span className="badge">
                                NEW
                            </span>
                        </div>

                        <p>
                            Your complaint <strong>CP2026001</strong> has been assigned to Officer Rahul Sharma.
                        </p>

                        <small>2 Minutes Ago</small>
                    </div>
                </div>

                {/* Notification 2 */}
                <div className="notification-card warning">
                    <div className="notification-icon">
                        🟡
                    </div>

                    <div className="notification-content">
                        <h3>Complaint In Progress</h3>

                        <p>
                            Repair work has started and is currently in progress.
                        </p>

                        <small>1 Hour Ago</small>
                    </div>
                </div>

                {/* Notification 3 */}
                <div className="notification-card info">
                    <div className="notification-icon">
                        🔵
                    </div>

                    <div className="notification-content">
                        <h3>Department Message</h3>

                        <p>
                            Road Maintenance Department has shared a new update regarding your complaint.
                        </p>

                        <small>Today</small>
                    </div>
                </div>

                {/* Notification 4 */}
                <div className="notification-card success">
                    <div className="notification-icon">
                        ✅
                    </div>

                    <div className="notification-content">
                        <h3>Complaint Resolved</h3>

                        <p>
                            Congratulations! Your complaint has been successfully resolved.
                        </p>

                        <small>Yesterday</small>
                    </div>
                </div>

                {/* Notification 5 */}
                <div className="notification-card danger">
                    <div className="notification-icon">
                        🔴
                    </div>

                    <div className="notification-content">
                        <h3>Work Delayed</h3>

                        <p>
                            Due to heavy rainfall, repair work has been delayed by one day.
                        </p>

                        <small>2 Days Ago</small>
                    </div>
                </div>

                <div className="notification-actions">
                    <button className="submit-btn">
                        ✓ Mark All as Read
                    </button>
                </div>
            </div>
        </div>
    );
}
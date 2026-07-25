import {
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaUsers,
    FaChartLine
} from "react-icons/fa";

import "../../styles/admin/Analytics.css";

export default function Analytics() {

    return (

        <div className="analytics-page">

            {/* Header */}

            <div className="analytics-header">

                <div>

                    <h1>Analytics Dashboard</h1>

                    <p>

                        Monitor complaint statistics and
                        platform performance.

                    </p>

                </div>

            </div>

            {/* Statistics */}

            <div className="analytics-cards">

                <div className="analytics-card">

                    <FaClipboardList className="analytics-icon blue"/>

                    <h2>1,248</h2>

                    <p>Total Complaints</p>

                </div>

                <div className="analytics-card">

                    <FaClock className="analytics-icon orange"/>

                    <h2>126</h2>

                    <p>Pending</p>

                </div>

                <div className="analytics-card">

                    <FaCheckCircle className="analytics-icon green"/>

                    <h2>1,010</h2>

                    <p>Resolved</p>

                </div>

                <div className="analytics-card">

                    <FaUsers className="analytics-icon purple"/>

                    <h2>42</h2>

                    <p>Active Officers</p>

                </div>

            </div>

            {/* Category Analytics */}

            <div className="analytics-section">

                <h2>

                    Complaint Categories

                </h2>

                <div className="progress-list">

                    <div className="progress-item">

                        <span>Road Damage</span>

                        <div className="progress-bar">

                            <div
                                className="progress-fill blue-fill"
                                style={{width:"82%"}}
                            />

                        </div>

                        <strong>82%</strong>

                    </div>

                    <div className="progress-item">

                        <span>Water Supply</span>

                        <div className="progress-bar">

                            <div
                                className="progress-fill green-fill"
                                style={{width:"68%"}}
                            />

                        </div>

                        <strong>68%</strong>

                    </div>

                    <div className="progress-item">

                        <span>Street Lights</span>

                        <div className="progress-bar">

                            <div
                                className="progress-fill orange-fill"
                                style={{width:"54%"}}
                            />

                        </div>

                        <strong>54%</strong>

                    </div>

                    <div className="progress-item">

                        <span>Garbage</span>

                        <div className="progress-bar">

                            <div
                                className="progress-fill purple-fill"
                                style={{width:"36%"}}
                            />

                        </div>

                        <strong>36%</strong>

                    </div>

                </div>

            </div>

            {/* Performance */}

            <div className="analytics-section">

                <h2>

                    Platform Performance

                </h2>

                <div className="performance-grid">

                    <div className="performance-card">

                        <FaChartLine/>

                        <h3>

                            Resolution Rate

                        </h3>

                        <h1>

                            87%

                        </h1>

                    </div>

                    <div className="performance-card">

                        <FaClock/>

                        <h3>

                            Avg Resolution Time

                        </h3>

                        <h1>

                            3.4 Days

                        </h1>

                    </div>

                    <div className="performance-card">

                        <FaUsers/>

                        <h3>

                            Citizen Satisfaction

                        </h3>

                        <h1>

                            4.7/5

                        </h1>

                    </div>

                </div>

            </div>

        </div>

    );

}
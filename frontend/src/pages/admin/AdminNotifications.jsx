import {
    FaBell,
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTrash
} from "react-icons/fa";

import "../../styles/admin/AdminNotifications.css";

export default function AdminNotifications() {

    const notifications = [

        {
            id:1,
            type:"warning",
            title:"High Priority Complaint",
            message:"A new high priority complaint has been submitted.",
            time:"5 minutes ago"
        },

        {
            id:2,
            type:"success",
            title:"Complaint Resolved",
            message:"Officer Rahul Sharma resolved complaint CP2026008.",
            time:"30 minutes ago"
        },

        {
            id:3,
            type:"info",
            title:"New Officer Registered",
            message:"Officer Amit Kumar has joined the Road Department.",
            time:"2 hours ago"
        },

        {
            id:4,
            type:"warning",
            title:"Pending Complaints",
            message:"12 complaints are pending for more than 7 days.",
            time:"Yesterday"
        }

    ];

    return(

        <div className="notifications-page">

            {/* Header */}

            <div className="notifications-header">

                <div>

                    <h1>

                        Notifications

                    </h1>

                    <p>

                        Stay updated with system activities.

                    </p>

                </div>

                <button className="mark-btn">

                    <FaCheckCircle/>

                    Mark All Read

                </button>

            </div>

            {/* List */}

            <div className="notification-list">

                {

                    notifications.map((item)=>(

                        <div
                            className="notification-card"
                            key={item.id}
                        >

                            <div className="notification-icon">

                                {

                                    item.type==="warning"

                                        ?

                                        <FaExclamationTriangle className="warning"/>

                                        :

                                        item.type==="success"

                                            ?

                                            <FaCheckCircle className="success"/>

                                            :

                                            <FaInfoCircle className="info"/>

                                }

                            </div>

                            <div className="notification-content">

                                <h3>

                                    {item.title}

                                </h3>

                                <p>

                                    {item.message}

                                </p>

                                <span>

                                    {item.time}

                                </span>

                            </div>

                            <button className="delete-btn">

                                <FaTrash/>

                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}
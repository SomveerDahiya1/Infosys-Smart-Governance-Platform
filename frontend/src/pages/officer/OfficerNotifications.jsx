import { useState } from "react";

import {
    FaBell,
    FaCheckCircle,
    FaTrash,
    FaSearch,
    FaExclamationTriangle,
    FaClipboardList
} from "react-icons/fa";

import "../../styles/officer/OfficerNotifications.css";

export default function OfficerNotifications() {
    const [notifications, setNotifications] = useState([
        {
            id:1,
            title:"New Complaint Assigned",
            message:"Complaint CP2026008 has been assigned to you.",
            time:"5 mins ago",
            read:false
        },
        {
            id:2,
            title:"Citizen Added Comment",
            message:"Citizen updated complaint CP2026002.",
            time:"30 mins ago",
            read:false
        },
        {
            id:3,
            title:"Deadline Reminder",
            message:"Complaint CP2026001 should be resolved today.",
            time:"2 hours ago",
            read:true
        },
        {
            id:4,
            title:"System Announcement",
            message:"Scheduled maintenance tonight from 11 PM.",
            time:"Today",
            read:true
        }
    ]);

    const markAsRead = (id) => {
        setNotifications(
            notifications.map((item) =>
                item.id === id
                    ? {...item, read:true}
                    : item
            )
        );
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="officer-notification-page">
            <div className="notification-header">
                <div>
                    <h1>Notifications</h1>

                    <p>
                        Stay updated with assigned complaints.
                    </p>
                </div>

                <button
                    className="clear-btn"
                    onClick={clearAll}
                >
                    <FaTrash />

                    Clear All
                </button>
            </div>

            <div className="notification-search">
                <FaSearch />

                <input
                    type="text"
                    placeholder="Search notifications..."
                />
            </div>

            {
                notifications.length === 0
                    ?
                    (
                        <div className="empty-notification">
                            <FaBell />

                            <h2>
                                No Notifications
                            </h2>

                            <p>
                                You're all caught up.
                            </p>
                        </div>
                    )
                    :
                    notifications.map((item) => (
                        <div
                            key={item.id}
                            className={
                                item.read
                                    ? "notification-card"
                                    : "notification-card unread"
                            }
                        >
                            <div className="notification-icon">
                                {
                                    item.title.includes("Assigned")
                                        ?
                                        <FaClipboardList />
                                        :
                                        item.title.includes("Deadline")
                                            ?
                                            <FaExclamationTriangle />
                                            :
                                            <FaBell />
                                }
                            </div>

                            <div className="notification-content">
                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.message}
                                </p>

                                <small>
                                    {item.time}
                                </small>
                            </div>

                            {
                                !item.read &&
                                <button
                                    className="read-btn"
                                    onClick={() => markAsRead(item.id)}
                                >
                                    <FaCheckCircle />

                                    Mark Read
                                </button>
                            }
                        </div>
                    ))
            }
        </div>
    );
}
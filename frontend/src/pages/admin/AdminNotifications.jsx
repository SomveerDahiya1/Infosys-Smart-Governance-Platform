import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle
} from "react-icons/fa";

import {
    useEffect,
    useState
} from "react";

import {
    getUserNotifications,
    markNotificationAsRead
} from "../../services/notificationService";

import "../../styles/admin/AdminNotifications.css";


export default function AdminNotifications() {

    const [notifications, setNotifications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // GET LOGGED-IN USER ID
    // ==========================================

    const userId =
        localStorage.getItem("userId");


    // ==========================================
    // FETCH NOTIFICATIONS
    // ==========================================

    const fetchNotifications = async () => {

        try {

            setLoading(true);
            setError("");

            if (!userId) {

                setError(
                    "User session not found. Please login again."
                );

                return;
            }


            const response =
                await getUserNotifications(userId);


            if (response.success) {

                setNotifications(
                    response.data || []
                );

            } else {

                setError(
                    response.message ||
                    "Unable to fetch notifications."
                );
            }

        } catch (error) {

            console.error(
                "Notification fetch error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load notifications."
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // LOAD ON PAGE OPEN
    // ==========================================

    useEffect(() => {

        fetchNotifications();

    }, []);


    // ==========================================
    // MARK SINGLE NOTIFICATION AS READ
    // ==========================================

    const handleMarkAsRead = async (
        notificationId
    ) => {

        try {

            const response =
                await markNotificationAsRead(
                    notificationId
                );


            if (response.success) {

                setNotifications(
                    (previousNotifications) =>
                        previousNotifications.map(
                            (notification) =>

                                notification.notificationId ===
                                notificationId

                                    ? {
                                        ...notification,
                                        isRead: true,
                                        readAt:
                                            response.data?.readAt ||
                                            new Date()
                                                .toISOString()
                                    }

                                    : notification
                        )
                );
            }

        } catch (error) {

            console.error(
                "Mark notification read error:",
                error
            );
        }
    };


    // ==========================================
    // MARK ALL AS READ
    // ==========================================

    const handleMarkAllAsRead = async () => {

        try {

            const unreadNotifications =
                notifications.filter(
                    (notification) =>
                        !notification.isRead
                );


            await Promise.all(

                unreadNotifications.map(
                    (notification) =>
                        markNotificationAsRead(
                            notification.notificationId
                        )
                )
            );


            setNotifications(
                (previousNotifications) =>
                    previousNotifications.map(
                        (notification) => ({
                            ...notification,
                            isRead: true
                        })
                    )
            );

        } catch (error) {

            console.error(
                "Mark all read error:",
                error
            );

            alert(
                "Unable to mark all notifications as read."
            );
        }
    };


    // ==========================================
    // FORMAT TIME
    // ==========================================

    const formatTime = (date) => {

        if (!date) {
            return "";
        }


        const notificationDate =
            new Date(date);

        const now =
            new Date();


        const difference =
            now - notificationDate;


        const minutes =
            Math.floor(
                difference / (1000 * 60)
            );


        const hours =
            Math.floor(
                difference / (1000 * 60 * 60)
            );


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        if (minutes < 1) {

            return "Just now";
        }


        if (minutes < 60) {

            return `${minutes} minute${
                minutes !== 1 ? "s" : ""
            } ago`;
        }


        if (hours < 24) {

            return `${hours} hour${
                hours !== 1 ? "s" : ""
            } ago`;
        }


        if (days === 1) {

            return "Yesterday";
        }


        if (days < 7) {

            return `${days} days ago`;
        }


        return notificationDate.toLocaleDateString();
    };


    // ==========================================
    // GET ICON
    // ==========================================

    const getNotificationIcon = (
        notification
    ) => {

        const title =
            notification.title?.toLowerCase() || "";


        if (
            title.includes("resolved")
        ) {

            return (
                <FaCheckCircle
                    className="success"
                />
            );
        }


        if (
            title.includes("rejected")
        ) {

            return (
                <FaExclamationTriangle
                    className="warning"
                />
            );
        }


        return (
            <FaInfoCircle
                className="info"
            />
        );
    };


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="notifications-page">


            {/* HEADER */}

            <div className="notifications-header">

                <div>

                    <h1>
                        Notifications
                    </h1>

                    <p>
                        Stay updated with your complaint activities.
                    </p>

                </div>


                <button
                    className="mark-btn"
                    onClick={handleMarkAllAsRead}
                >

                    <FaCheckCircle />

                    Mark All Read

                </button>

            </div>


            {/* LOADING */}

            {loading && (

                <div className="notification-empty">

                    Loading notifications...

                </div>

            )}


            {/* ERROR */}

            {!loading && error && (

                <div className="notification-error">

                    {error}

                </div>

            )}


            {/* EMPTY STATE */}

            {!loading &&
                !error &&
                notifications.length === 0 && (

                    <div className="notification-empty">

                        <FaInfoCircle />

                        <h3>
                            No Notifications
                        </h3>

                        <p>
                            You don't have any notifications yet.
                        </p>

                    </div>

                )}


            {/* NOTIFICATION LIST */}

            {!loading &&
                !error &&
                notifications.length > 0 && (

                    <div className="notification-list">

                        {notifications.map(
                            (item) => (

                                <div

                                    className={
                                        `notification-card ${
                                            item.isRead
                                                ? "read"
                                                : "unread"
                                        }`
                                    }

                                    key={
                                        item.notificationId
                                    }

                                    onClick={() => {

                                        if (!item.isRead) {

                                            handleMarkAsRead(
                                                item.notificationId
                                            );
                                        }

                                    }}

                                >


                                    {/* ICON */}

                                    <div className="notification-icon">

                                        {getNotificationIcon(item)}

                                    </div>


                                    {/* CONTENT */}

                                    <div className="notification-content">

                                        <h3>

                                            {item.title}

                                        </h3>


                                        <p>

                                            {item.message}

                                        </p>


                                        <span>

                                            {formatTime(
                                                item.createdAt
                                            )}

                                        </span>

                                    </div>


                                    {/* UNREAD DOT */}

                                    {!item.isRead && (

                                        <div
                                            className="unread-indicator"
                                        />

                                    )}

                                </div>

                            )
                        )}

                    </div>

                )}

        </div>
    );
}
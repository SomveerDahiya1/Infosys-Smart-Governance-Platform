import api from "./api";

// ==========================================
// GET USER NOTIFICATIONS
// ==========================================

export const getUserNotifications = async (userId) => {

    const response =
        await api.get(
            `/notifications/user/${userId}`
        );

    return response.data;
};


// ==========================================
// MARK NOTIFICATION AS READ
// ==========================================

export const markNotificationAsRead = async (
    notificationId
) => {

    const response =
        await api.put(
            `/notifications/${notificationId}/read`
        );

    return response.data;
};
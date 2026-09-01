import api from "./api";

const complaintService = {

    // ==========================================
    // DASHBOARD STATISTICS
    // ==========================================

    getDashboardStatistics: async () => {

        const response =
            await api.get("/complaints/dashboard");

        return response.data;
    },


    // ==========================================
    // GET ALL COMPLAINTS
    // ==========================================

    getAllComplaints: async () => {

        const response =
            await api.get("/complaints");

        return response.data;
    },


    // ==========================================
    // GET COMPLAINTS BY CITIZEN
    // ==========================================

    getComplaintsByCitizen: async (citizenId) => {

        const response =
            await api.get(
                `/complaints/citizen/${citizenId}`
            );

        return response.data;
    },


    // ==========================================
    // GET COMPLAINT BY ID
    // ==========================================

    getComplaintById: async (complaintId) => {

        const response =
            await api.get(
                `/complaints/${complaintId}`
            );

        return response.data;
    },


    // ==========================================
    // GET ASSIGNED COMPLAINTS
    // ==========================================

    getAssignedComplaints: async (officerId) => {

        const response =
            await api.get(
                `/complaints/officer/${officerId}`
            );

        return response.data;
    },


    // ==========================================
    // FILTER COMPLAINTS
    // ==========================================

    filterComplaints: async (
        statusId,
        priorityId,
        categoryId
    ) => {

        const params = {};

        if (
            statusId !== undefined &&
            statusId !== null
        ) {
            params.statusId = statusId;
        }

        if (
            priorityId !== undefined &&
            priorityId !== null
        ) {
            params.priorityId = priorityId;
        }

        if (
            categoryId !== undefined &&
            categoryId !== null
        ) {
            params.categoryId = categoryId;
        }

        const response =
            await api.get(
                "/complaints/filter",
                { params }
            );

        return response.data;
    },


    // ==========================================
    // CREATE COMPLAINT
    // ==========================================

    createComplaint: async (
        citizenId,
        complaintData
    ) => {

        const response =
            await api.post(
                `/complaints/citizen/${citizenId}`,
                complaintData
            );

        return response.data;
    },


    // ==========================================
    // UPDATE COMPLAINT
    // ==========================================

    updateComplaint: async (
        complaintId,
        userId,
        complaintData
    ) => {

        const response =
            await api.put(
                `/complaints/${complaintId}/user/${userId}`,
                complaintData
            );

        return response.data;
    },


    // ==========================================
    // ASSIGN COMPLAINT
    // ==========================================

    assignComplaint: async (
        complaintId,
        adminUserId,
        assignmentData
    ) => {

        const response =
            await api.post(
                `/complaints/${complaintId}/assign/admin/${adminUserId}`,
                assignmentData
            );
        return response.data;
    },


    // ==========================================
    // COMPLAINT HISTORY
    // ==========================================

    getComplaintHistory: async (complaintId) => {

        const response =
            await api.get(
                `/complaints/${complaintId}/history`
            );

        return response.data;
    }

};

export default complaintService;
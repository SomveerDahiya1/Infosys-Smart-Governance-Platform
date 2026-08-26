import api from "./api";


const officerService = {

    // ==========================================
    // GET ALL OFFICERS
    // INCLUDING WORKLOAD
    // ==========================================

    getAllOfficers: async () => {

        const response =
            await api.get(
                "/officers"
            );

        return response.data;

    },


    // ==========================================
    // GET OFFICER BY ID
    // ==========================================

    getOfficerById: async (
        officerId
    ) => {

        const response =
            await api.get(
                `/officers/${officerId}`
            );

        return response.data;

    },


    // ==========================================
    // GET OFFICER ASSIGNED COMPLAINTS
    // ==========================================

    getAssignedComplaints: async (
        officerId
    ) => {

        const response =
            await api.get(
                `/officers/${officerId}/complaints`
            );

        return response.data;

    }

};


export default officerService;
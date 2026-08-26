import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// ==========================================
// JWT INTERCEPTOR
// ==========================================

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// ==========================================
// ADMIN PROFILE - GET
// ==========================================

export const getAdminProfile = () => {
    return api.get("/admins/profile");
};


// ==========================================
// ADMIN PROFILE - UPDATE
// ==========================================

export const updateAdminProfile = (profileData) => {
    return api.put(
        "/admins/profile",
        profileData
    );
};


export default api;
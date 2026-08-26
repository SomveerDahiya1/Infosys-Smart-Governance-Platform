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
    (error) => Promise.reject(error)
);


// ==========================================
// ADMIN PROFILE
// ==========================================

export const getAdminProfile = async () => {
    return await api.get("/admins/profile");
};


export default api;
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});


// ==========================================
// ADD JWT TO EVERY REQUEST
// ==========================================

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ==========================================
// HANDLE EXPIRED / INVALID JWT
// ==========================================

api.interceptors.response.use(

    (response) => {
        return response;
    },

    (error) => {

        if (error.response) {

            const status =
                error.response.status;


            // JWT expired / unauthorized
            if (status === 401) {

                console.warn(
                    "JWT expired or unauthorized. Logging out..."
                );


                // Remove old authentication data
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("role");
                localStorage.removeItem("userId");


                // Redirect to login/home
                window.location.href = "/";
            }
        }


        return Promise.reject(error);
    }
);


// ==========================================
// ADMIN PROFILE
// ==========================================

export const getAdminProfile = () => {

    return api.get(
        "/admins/profile"
    );
};


// ==========================================
// UPDATE ADMIN PROFILE
// ==========================================

export const updateAdminProfile = (
    profileData
) => {

    return api.put(
        "/admins/profile",
        profileData
    );
};


export default api;
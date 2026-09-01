// ==========================================
// LOGOUT
// ==========================================

export const logout = () => {

    // ==========================================
    // REMOVE AUTHENTICATION DATA
    // ==========================================

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("role");

    localStorage.removeItem("userId");

    localStorage.removeItem("citizenId");

    localStorage.removeItem("email");

    localStorage.removeItem("auth");


    // ==========================================
    // REDIRECT TO HOME
    // ==========================================

    window.location.href = "/";
};


// ==========================================
// CHECK LOGIN STATUS
// ==========================================

export const isAuthenticated = () => {

    const token =
        localStorage.getItem("token");

    return !!token;
};


// ==========================================
// GET CURRENT USER
// ==========================================

export const getCurrentUser = () => {

    const user =
        localStorage.getItem("user");


    if (!user) {
        return null;
    }


    try {

        return JSON.parse(user);

    } catch (error) {

        console.error(
            "Unable to parse stored user:",
            error
        );

        return null;
    }

};


// ==========================================
// GET CURRENT ROLE
// ==========================================

export const getCurrentRole = () => {

    return localStorage.getItem(
        "role"
    );
};


// ==========================================
// GET CURRENT USER ID
// ==========================================

export const getCurrentUserId = () => {

    return localStorage.getItem(
        "userId"
    );
};


// ==========================================
// GET CURRENT CITIZEN ID
// ==========================================

export const getCurrentCitizenId = () => {

    return localStorage.getItem(
        "citizenId"
    );
};
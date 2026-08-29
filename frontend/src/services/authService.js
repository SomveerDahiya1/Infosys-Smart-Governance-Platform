// ==========================================
// AUTH SERVICE
// ==========================================


/**
 * Logout the currently logged-in user.
 *
 * Clears all authentication-related data
 * from localStorage and redirects to login page.
 */
export const logout = () => {

    // ------------------------------------------
    // Remove JWT
    // ------------------------------------------

    localStorage.removeItem("token");


    // ------------------------------------------
    // Remove logged-in user information
    // ------------------------------------------

    localStorage.removeItem("user");


    // ------------------------------------------
    // Remove role
    // ------------------------------------------

    localStorage.removeItem("role");


    // ------------------------------------------
    // Remove user ID
    // ------------------------------------------

    localStorage.removeItem("userId");


    // ------------------------------------------
    // Remove any other possible auth data
    // ------------------------------------------

    localStorage.removeItem("email");

    localStorage.removeItem("auth");


    // ------------------------------------------
    // Redirect to login/home page
    // ------------------------------------------

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

    return localStorage.getItem("role");
};
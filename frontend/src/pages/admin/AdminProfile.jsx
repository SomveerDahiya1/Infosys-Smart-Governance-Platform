import { useEffect, useState } from "react";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCamera,
    FaSave
} from "react-icons/fa";

import "../../styles/admin/AdminProfile.css";

import {
    getAdminProfile,
    updateAdminProfile
} from "../../services/api";


export default function AdminProfile() {

    // ==========================================
    // STATE
    // ==========================================

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("ADMIN");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ==========================================
    // LOAD PROFILE
    // ==========================================

    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await getAdminProfile();

            console.log(
                "ADMIN PROFILE:",
                response.data
            );


            const profile =
                response.data?.data;


            if (!profile) {

                throw new Error(
                    "Profile data not received from server."
                );
            }


            // ==========================================
            // NAME
            // ==========================================

            const firstName =
                profile.firstName || "";

            const lastName =
                profile.lastName || "";


            setName(
                `${firstName} ${lastName}`.trim()
            );


            // ==========================================
            // EMAIL
            // ==========================================

            setEmail(
                profile.email || ""
            );


            // ==========================================
            // PHONE
            // ==========================================

            setPhone(
                profile.phoneNumber || ""
            );


            // ==========================================
            // ROLE
            // ==========================================

            setRole(
                profile.role || "ADMIN"
            );


        } catch (error) {

            console.error(
                "LOAD PROFILE ERROR:",
                error
            );


            if (error.response) {

                setError(
                    error.response.data?.message ||
                    "Unable to load profile."
                );

            } else if (error.request) {

                setError(
                    "Unable to connect to backend server."
                );

            } else {

                setError(
                    error.message ||
                    "Unable to load profile."
                );
            }

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // SAVE PROFILE
    // ==========================================

    const handleSave = async () => {

        try {

            setSaving(true);
            setError("");
            setSuccess("");


            // ------------------------------------------
            // Validate name
            // ------------------------------------------

            const trimmedName =
                name.trim();


            if (!trimmedName) {

                setError(
                    "Name cannot be empty."
                );

                return;
            }


            // ------------------------------------------
            // Split full name
            // ------------------------------------------

            const nameParts =
                trimmedName.split(/\s+/);


            const firstName =
                nameParts[0];


            const lastName =
                nameParts.length > 1
                    ? nameParts.slice(1).join(" ")
                    : "";


            // ------------------------------------------
            // Request body
            // ------------------------------------------

            const profileData = {

                firstName: firstName,

                lastName: lastName,

                phoneNumber:
                    phone.trim()

            };


            console.log(
                "UPDATING ADMIN PROFILE:",
                profileData
            );


            // ------------------------------------------
            // API CALL
            // ------------------------------------------

            const response =
                await updateAdminProfile(
                    profileData
                );


            console.log(
                "UPDATE PROFILE RESPONSE:",
                response.data
            );


            // ------------------------------------------
            // Update UI
            // ------------------------------------------

            const updatedProfile =
                response.data?.data;


            if (updatedProfile) {

                const updatedFirstName =
                    updatedProfile.firstName || "";

                const updatedLastName =
                    updatedProfile.lastName || "";


                setName(
                    `${updatedFirstName} ${updatedLastName}`.trim()
                );


                setEmail(
                    updatedProfile.email || email
                );


                setPhone(
                    updatedProfile.phoneNumber || ""
                );


                setRole(
                    updatedProfile.role || role
                );
            }


            setSuccess(
                "Profile updated successfully."
            );


        } catch (error) {

            console.error(
                "SAVE PROFILE ERROR:",
                error
            );


            if (error.response) {

                setError(
                    error.response.data?.message ||
                    "Failed to update profile."
                );

            } else if (error.request) {

                setError(
                    "Unable to connect to backend server."
                );

            } else {

                setError(
                    error.message ||
                    "Failed to update profile."
                );
            }

        } finally {

            setSaving(false);

        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="profile-page">

                <div className="profile-header">

                    <h1>
                        Admin Profile
                    </h1>

                    <p>
                        Loading your profile information...
                    </p>

                </div>


                <div className="profile-container">

                    <div className="profile-card">

                        <div className="profile-image">
                            Loading...
                        </div>

                        <h2>
                            Loading...
                        </h2>

                        <p>
                            CivicPulse Administrator
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error && !name) {

        return (
            <div className="profile-page">

                <div className="profile-header">

                    <h1>
                        Admin Profile
                    </h1>

                    <p>
                        Manage your personal information
                        and account settings.
                    </p>

                </div>


                <div className="profile-container">

                    <div className="profile-card">

                        <div className="profile-image">
                            !
                        </div>

                        <h2>
                            Unable to load profile
                        </h2>

                        <p>
                            {error}
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    // ==========================================
    // AVATAR
    // ==========================================

    const avatarUrl =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name || "Admin"
        )}&background=2563eb&color=ffffff&size=200`;


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="profile-page">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="profile-header">

                <h1>
                    Admin Profile
                </h1>

                <p>
                    Manage your personal information
                    and account settings.
                </p>

            </div>


            {/* ==========================================
                SUCCESS MESSAGE
            ========================================== */}

            {success && (

                <div className="profile-success">
                    {success}
                </div>

            )}


            {/* ==========================================
                ERROR MESSAGE
            ========================================== */}

            {error && (

                <div className="profile-error-message">
                    {error}
                </div>

            )}


            <div className="profile-container">

                {/* ==========================================
                    LEFT PROFILE CARD
                ========================================== */}

                <div className="profile-card">

                    <div className="profile-image">

                        <img
                            src={avatarUrl}
                            alt={name || "Admin"}
                        />


                        <button
                            type="button"
                            title="Change profile picture"
                        >
                            <FaCamera />
                        </button>

                    </div>


                    <h2>
                        {name || "Admin"}
                    </h2>


                    <p>
                        {role}
                    </p>

                </div>


                {/* ==========================================
                    RIGHT PROFILE FORM
                ========================================== */}

                <div className="profile-form">

                    {/* ==========================================
                        FULL NAME
                    ========================================== */}

                    <div className="form-group">

                        <label>

                            <FaUser />

                            Full Name

                        </label>


                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {

                                setName(
                                    e.target.value
                                );

                                setSuccess("");

                            }}
                            disabled={saving}
                        />

                    </div>


                    {/* ==========================================
                        EMAIL
                    ========================================== */}

                    <div className="form-group">

                        <label>

                            <FaEnvelope />

                            Email

                        </label>


                        <input
                            type="email"
                            value={email}
                            readOnly
                            title="Email is linked with your login account"
                        />


                        <small>
                            Email is linked with your
                            login account and cannot
                            be changed here.
                        </small>

                    </div>


                    {/* ==========================================
                        PHONE
                    ========================================== */}

                    <div className="form-group">

                        <label>

                            <FaPhone />

                            Phone

                        </label>


                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => {

                                setPhone(
                                    e.target.value
                                );

                                setSuccess("");

                            }}
                            disabled={saving}
                        />

                    </div>


                    {/* ==========================================
                        SAVE BUTTON
                    ========================================== */}

                    <button
                        type="button"
                        className="save-btn"
                        onClick={handleSave}
                        disabled={saving}
                    >

                        <FaSave />

                        {saving
                            ? "Saving..."
                            : "Save Changes"
                        }

                    </button>

                </div>

            </div>

        </div>
    );
}
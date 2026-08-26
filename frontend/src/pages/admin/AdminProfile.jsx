import { useEffect, useState } from "react";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCamera,
    FaSave,
} from "react-icons/fa";

import "../../styles/admin/AdminProfile.css";

import { getAdminProfile } from "../../services/api";


export default function AdminProfile() {

    // ==========================================
    // STATE
    // ==========================================

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [role, setRole] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // LOAD PROFILE
    // ==========================================

    useEffect(() => {

        const loadProfile = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getAdminProfile();

                console.log(
                    "ADMIN PROFILE RESPONSE:",
                    response.data
                );


                const profile =
                    response.data?.data;


                if (!profile) {

                    throw new Error(
                        "Profile data was not received from server."
                    );
                }


                // ==========================================
                // NAME
                // ==========================================

                const firstName =
                    profile.firstName || "";

                const lastName =
                    profile.lastName || "";


                const fullName =
                    `${firstName} ${lastName}`.trim();


                setName(
                    fullName || "Admin"
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


                // ==========================================
                // ADDRESS
                // ==========================================

                setAddress(
                    profile.address || ""
                );


            } catch (err) {

                console.error(
                    "ADMIN PROFILE ERROR:",
                    err
                );


                if (err.response) {

                    console.error(
                        "STATUS:",
                        err.response.status
                    );

                    console.error(
                        "RESPONSE:",
                        err.response.data
                    );


                    setError(
                        err.response.data?.message ||
                        "Unable to load profile."
                    );

                } else if (err.request) {

                    setError(
                        "Backend server is not reachable."
                    );

                } else {

                    setError(
                        err.message ||
                        "Unable to load profile."
                    );
                }

            } finally {

                setLoading(false);

            }
        };


        loadProfile();

    }, []);


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

                            <div className="profile-loading">
                                Loading...
                            </div>

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

    if (error) {

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

                            <div className="profile-error">
                                !
                            </div>

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


            <div className="profile-container">

                {/* ==========================================
                    PROFILE CARD
                ========================================== */}

                <div className="profile-card">

                    <div className="profile-image">

                        <img
                            src={avatarUrl}
                            alt={name}
                        />

                        <button
                            type="button"
                            title="Change profile picture"
                        >
                            <FaCamera />
                        </button>

                    </div>


                    <h2>
                        {name}
                    </h2>


                    <p>
                        {role}
                    </p>

                </div>


                {/* ==========================================
                    PROFILE FORM
                ========================================== */}

                <div className="profile-form">

                    {/* NAME */}

                    <div className="form-group">

                        <label>

                            <FaUser />

                            Full Name

                        </label>


                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                        <label>

                            <FaEnvelope />

                            Email

                        </label>


                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* PHONE */}

                    <div className="form-group">

                        <label>

                            <FaPhone />

                            Phone

                        </label>


                        <input
                            type="text"
                            value={phone}
                            onChange={(e) =>
                                setPhone(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* ADDRESS */}

                    <div className="form-group">

                        <label>

                            <FaMapMarkerAlt />

                            Address

                        </label>


                        <textarea
                            rows="4"
                            value={address}
                            onChange={(e) =>
                                setAddress(
                                    e.target.value
                                )
                            }
                            placeholder="Address not available"
                        />

                    </div>


                    {/* SAVE */}

                    <button
                        type="button"
                        className="save-btn"
                    >

                        <FaSave />

                        Save Changes

                    </button>

                </div>

            </div>

        </div>
    );
}
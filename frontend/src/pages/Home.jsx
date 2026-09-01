import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../styles/Home.css";

import {
    FaUser,
    FaUserShield,
    FaBuilding,
    FaMoon,
    FaEnvelope,
    FaLock,
} from "react-icons/fa";

import api from "../services/api";


export default function Home() {

    const [portal, setPortal] =
        useState("Citizen");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const navigate = useNavigate();


    // ==========================================
    // LOGIN
    // ==========================================

    const handleLogin = async () => {

        setError("");


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!email.trim() || !password.trim()) {

            setError(
                "Please enter email and password."
            );

            return;
        }


        setLoading(true);


        try {

            // ==========================================
            // LOGIN API
            // ==========================================

            const response =
                await api.post(
                    "/auth/login",
                    {
                        email: email.trim(),
                        password: password,
                    }
                );


            const authData =
                response.data.data;


            console.log(
                "Login response:",
                authData
            );


            // ==========================================
            // VALIDATE TOKEN
            // ==========================================

            if (
                !authData ||
                !authData.token
            ) {

                setError(
                    "Login successful, but token was not received."
                );

                return;
            }


            // ==========================================
            // CLEAR OLD AUTH DATA
            // ==========================================

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");
            localStorage.removeItem("citizenId");


            // ==========================================
            // SAVE JWT
            // ==========================================

            localStorage.setItem(
                "token",
                authData.token
            );


            // ==========================================
            // SAVE COMPLETE USER DATA
            // ==========================================

            localStorage.setItem(
                "user",
                JSON.stringify(authData)
            );


            // ==========================================
            // SAVE USER ID
            // ==========================================

            if (authData.userId) {

                localStorage.setItem(
                    "userId",
                    String(authData.userId)
                );
            }


            // ==========================================
            // SAVE ROLE
            // ==========================================

            if (authData.role) {

                localStorage.setItem(
                    "role",
                    authData.role
                );
            }


            // ==========================================
            // SAVE CITIZEN ID
            // VERY IMPORTANT
            // ==========================================

            if (authData.citizenId) {

                localStorage.setItem(
                    "citizenId",
                    String(authData.citizenId)
                );

                console.log(
                    "Citizen ID saved:",
                    authData.citizenId
                );
            }


            console.log(
                "User ID:",
                authData.userId
            );


            console.log(
                "Role:",
                authData.role
            );


            // ==========================================
            // ROLE BASED NAVIGATION
            // ==========================================

            const role =
                authData.role?.toUpperCase();


            // ==========================================
            // ADMIN
            // ==========================================

            if (
                role === "ADMIN" ||
                role === "ROLE_ADMIN"
            ) {

                navigate(
                    "/admin/dashboard"
                );

                return;
            }


            // ==========================================
            // OFFICER
            // ==========================================

            if (
                role === "OFFICER" ||
                role === "ROLE_OFFICER"
            ) {

                navigate(
                    "/officer/dashboard"
                );

                return;
            }


            // ==========================================
            // CITIZEN
            // ==========================================

            if (
                role === "CITIZEN" ||
                role === "ROLE_CITIZEN"
            ) {

                // Make sure citizen profile exists

                if (!authData.citizenId) {

                    setError(
                        "Citizen profile not found. Please contact administrator."
                    );

                    return;
                }


                navigate(
                    "/citizen/dashboard"
                );

                return;
            }


            // ==========================================
            // UNKNOWN ROLE
            // ==========================================

            setError(
                `Unknown user role: ${authData.role}`
            );

        } catch (error) {

            console.error(
                "Login failed:",
                error
            );


            if (error.response) {

                setError(
                    error.response.data?.message ||
                    "Invalid email or password."
                );

            }

            else if (error.request) {

                setError(
                    "Unable to connect to server. Please make sure Spring Boot is running."
                );

            }

            else {

                setError(
                    "Something went wrong. Please try again."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="home">

            {/* ==================================
                NAVBAR
            ================================== */}

            <nav className="navbar">

                <div className="logo">

                    <div className="logo-circle">
                        🏛️
                    </div>

                    <div>

                        <h2>
                            CivicPulse
                        </h2>

                        <span>
                            Smart Governance
                        </span>

                    </div>

                </div>


                <button
                    className="dark-btn"
                    type="button"
                >

                    <FaMoon />

                    Dark Mode

                </button>

            </nav>


            {/* ==================================
                HERO
            ================================== */}

            <section className="hero">

                <div className="left">

                    <p className="tag">
                        SMART GOVERNANCE SYSTEM
                    </p>


                    <h1>

                        CivicPulse

                        <br />

                        Complaint Portal

                    </h1>


                    <p className="desc">

                        A unified platform where
                        Citizens, Officers and
                        Administrators collaborate
                        to resolve civic issues
                        efficiently.

                    </p>


                    <div className="features">

                        <div className="feature">
                            🚧 Road Complaints
                        </div>

                        <div className="feature">
                            💧 Water Issues
                        </div>

                        <div className="feature">
                            🚮 Sanitation
                        </div>

                        <div className="feature">
                            🚦 Traffic
                        </div>

                    </div>

                </div>


                {/* ==================================
                    LOGIN CARD
                ================================== */}

                <div className="login-card">

                    <p className="small-title">
                        LOGIN PORTAL
                    </p>


                    <h2>
                        {portal} Portal
                    </h2>


                    {/* PORTAL TABS */}

                    <div className="tabs">

                        <button

                            className={
                                portal === "Citizen"
                                    ? "active"
                                    : ""
                            }

                            onClick={() => {

                                setPortal("Citizen");
                                setError("");

                            }}

                            type="button"
                        >

                            <FaUser />

                            Citizen

                        </button>


                        <button

                            className={
                                portal === "Admin"
                                    ? "active"
                                    : ""
                            }

                            onClick={() => {

                                setPortal("Admin");
                                setError("");

                            }}

                            type="button"
                        >

                            <FaBuilding />

                            Admin

                        </button>


                        <button

                            className={
                                portal === "Officer"
                                    ? "active"
                                    : ""
                            }

                            onClick={() => {

                                setPortal("Officer");
                                setError("");

                            }}

                            type="button"
                        >

                            <FaUserShield />

                            Officer

                        </button>

                    </div>


                    {/* EMAIL */}

                    <label>
                        Email
                    </label>


                    <div className="input-box">

                        <FaEnvelope />

                        <input

                            type="email"

                            value={email}

                            onChange={(event) => {

                                setEmail(
                                    event.target.value
                                );

                                setError("");

                            }}

                            placeholder={
                                `Enter ${portal.toLowerCase()} email`
                            }

                            disabled={loading}

                        />

                    </div>


                    {/* PASSWORD */}

                    <label>
                        Password
                    </label>


                    <div className="input-box">

                        <FaLock />

                        <input

                            type="password"

                            value={password}

                            onChange={(event) => {

                                setPassword(
                                    event.target.value
                                );

                                setError("");

                            }}

                            placeholder="Enter password"

                            disabled={loading}

                            onKeyDown={(event) => {

                                if (
                                    event.key === "Enter"
                                ) {

                                    handleLogin();
                                }

                            }}

                        />

                    </div>


                    {/* ERROR */}

                    {error && (

                        <p
                            className="login-error"
                            style={{
                                color: "#dc2626",
                                marginTop: "10px",
                                fontSize: "14px",
                            }}
                        >

                            {error}

                        </p>

                    )}


                    {/* LOGIN BUTTON */}

                    <button

                        className="login-btn"

                        onClick={handleLogin}

                        disabled={loading}

                        type="button"
                    >

                        {loading
                            ? "Logging in..."
                            : `Continue to ${portal} Portal`
                        }

                    </button>


                    {/* LINKS */}

                    <div className="bottom-links">

                        <a
                            href="#"
                            onClick={(event) =>
                                event.preventDefault()
                            }
                        >
                            Create Account
                        </a>


                        <a
                            href="#"
                            onClick={(event) =>
                                event.preventDefault()
                            }
                        >
                            Forgot Password?
                        </a>

                    </div>

                </div>

            </section>

        </div>
    );
}
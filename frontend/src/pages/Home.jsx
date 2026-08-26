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

        // Clear previous error
        setError("");


        // ==========================================
        // BASIC VALIDATION
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


            console.log(
                "Login response:",
                response.data
            );


            /*
             Backend response structure:

             {
                 success: true,
                 message: "Login successful",
                 data: {
                     token: "...",
                     userId: 1,
                     firstName: "...",
                     lastName: "...",
                     email: "...",
                     role: "ADMIN"
                 }
             }
            */

            const authData =
                response.data.data;


            // ==========================================
            // VALIDATE RESPONSE
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
            // SAVE JWT TOKEN
            // ==========================================

            localStorage.setItem(
                "token",
                authData.token
            );


            // ==========================================
            // SAVE COMPLETE USER INFORMATION
            // ==========================================

            localStorage.setItem(
                "user",
                JSON.stringify(authData)
            );


            // ==========================================
            // SAVE USER ID
            // IMPORTANT FOR ADMIN / OFFICER ACTIONS
            // ==========================================

            localStorage.setItem(
                "userId",
                String(authData.userId)
            );


            console.log(
                "JWT and user information saved successfully."
            );

            console.log(
                "Logged in user ID:",
                authData.userId
            );


            // ==========================================
            // ROLE BASED NAVIGATION
            // ==========================================

            const role =
                authData.role?.toUpperCase();


            // ADMIN

            if (
                role === "ADMIN" ||
                role === "ROLE_ADMIN"
            ) {

                navigate(
                    "/admin/dashboard"
                );

            }


            // OFFICER

            else if (
                role === "OFFICER" ||
                role === "ROLE_OFFICER"
            ) {

                navigate(
                    "/officer/dashboard"
                );

            }


            // CITIZEN

            else if (
                role === "CITIZEN" ||
                role === "ROLE_CITIZEN"
            ) {

                navigate(
                    "/citizen/dashboard"
                );

            }


            // UNKNOWN ROLE

            else {

                setError(
                    `Unknown user role: ${authData.role}`
                );

            }

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

            } else if (error.request) {

                setError(
                    "Unable to connect to server. Please make sure Spring Boot is running."
                );

            } else {

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
                >

                    <FaMoon />

                    Dark Mode

                </button>

            </nav>


            {/* ==================================
                HERO SECTION
            ================================== */}

            <section className="hero">


                {/* LEFT SECTION */}

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


                        {/* CITIZEN */}

                        <button

                            className={
                                portal === "Citizen"
                                    ? "active"
                                    : ""
                            }

                            onClick={() => {

                                setPortal(
                                    "Citizen"
                                );

                                setError("");

                            }}

                            type="button"
                        >

                            <FaUser />

                            Citizen

                        </button>


                        {/* ADMIN */}

                        <button

                            className={
                                portal === "Admin"
                                    ? "active"
                                    : ""
                            }

                            onClick={() => {

                                setPortal(
                                    "Admin"
                                );

                                setError("");

                            }}

                            type="button"
                        >

                            <FaBuilding />

                            Admin

                        </button>


                        {/* OFFICER */}

                        <button

                            className={
                                portal === "Officer"
                                    ? "active"
                                    : ""
                            }

                            onClick={() => {

                                setPortal(
                                    "Officer"
                                );

                                setError("");

                            }}

                            type="button"
                        >

                            <FaUserShield />

                            Officer

                        </button>

                    </div>


                    {/* ==================================
                        EMAIL
                    ================================== */}

                    <label>

                        Email

                    </label>


                    <div className="input-box">

                        <FaEnvelope />

                        <input

                            type="email"

                            value={
                                email
                            }

                            onChange={(event) => {

                                setEmail(
                                    event.target.value
                                );

                                setError("");

                            }}

                            placeholder={
                                `Enter ${portal.toLowerCase()} email`
                            }

                            disabled={
                                loading
                            }

                        />

                    </div>


                    {/* ==================================
                        PASSWORD
                    ================================== */}

                    <label>

                        Password

                    </label>


                    <div className="input-box">

                        <FaLock />

                        <input

                            type="password"

                            value={
                                password
                            }

                            onChange={(event) => {

                                setPassword(
                                    event.target.value
                                );

                                setError("");

                            }}

                            placeholder="Enter password"

                            disabled={
                                loading
                            }

                            onKeyDown={(event) => {

                                if (
                                    event.key === "Enter"
                                ) {

                                    handleLogin();

                                }

                            }}

                        />

                    </div>


                    {/* ==================================
                        ERROR MESSAGE
                    ================================== */}

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


                    {/* ==================================
                        LOGIN BUTTON
                    ================================== */}

                    <button

                        className="login-btn"

                        onClick={
                            handleLogin
                        }

                        disabled={
                            loading
                        }

                        type="button"
                    >

                        {loading
                            ? "Logging in..."
                            : `Continue to ${portal} Portal`
                        }

                    </button>


                    {/* ==================================
                        BOTTOM LINKS
                    ================================== */}

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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/common/Forms.css";

import api from "../../services/api";

export default function SubmitComplaint() {

const navigate = useNavigate();
// ==========================================
// FORM STATES
// ==========================================

const [title, setTitle] =
    useState("");

const [category, setCategory] =
    useState("");

const [priority, setPriority] =
    useState("");

const [location, setLocation] =
    useState("");

const [city, setCity] =
    useState("");

const [pincode, setPincode] =
    useState("");

const [description, setDescription] =
    useState("");

const [image, setImage] =
    useState(null);

const [agree, setAgree] =
    useState(false);

const [loading, setLoading] =
    useState(false);


// ==========================================
// CATEGORY ID MAPPING
// DATABASE CATEGORY IDs
// ==========================================

const categoryMap = {

    "Road Damage": 1,

    "Water Leakage": 2,

    "Street Light": 3,

    "Garbage": 4,

    "Drainage": 5,

};


// ==========================================
// PRIORITY ID MAPPING
// DATABASE PRIORITY IDs
// ==========================================

const priorityMap = {

    "Low": 1,

    "Medium": 2,

    "High": 3,

    "Critical": 4,

};


// ==========================================
// RESET FORM
// ==========================================

const resetForm = () => {

    setTitle("");

    setCategory("");

    setPriority("");

    setLocation("");

    setCity("");

    setPincode("");

    setDescription("");

    setImage(null);

    setAgree(false);

};


// ==========================================
// SUBMIT COMPLAINT
// ==========================================

const handleSubmit = async () => {

    // ==========================================
    // VALIDATION
    // ==========================================

    if (

        !title.trim() ||

        !category ||

        !priority ||

        !location.trim() ||

        !city.trim() ||

        !pincode.trim() ||

        !description.trim() ||

        !agree

    ) {

        alert(
            "Please fill all required fields."
        );

        return;

    }


    // ==========================================
    // GET CITIZEN ID
    // ==========================================

    const citizenId =
        localStorage.getItem(
            "citizenId"
        );


    if (!citizenId) {

        alert(
            "Citizen information not found. Please login again."
        );

        navigate("/");

        return;

    }


    // ==========================================
    // GET CATEGORY ID
    // ==========================================

    const categoryId =
        categoryMap[category];


    // ==========================================
    // GET PRIORITY ID
    // ==========================================

    const priorityId =
        priorityMap[priority];


    if (!categoryId || !priorityId) {

        alert(
            "Invalid category or priority."
        );

        return;

    }


    // ==========================================
    // REQUEST DATA
    // ==========================================

    const complaintData = {

        categoryId: categoryId,

        priorityId: priorityId,

        title: title.trim(),

        description:
            description.trim(),

        addressLine:
            location.trim(),

        area:
            location.trim(),

        city:
            city.trim(),

        state:
            "Haryana",

        pincode:
            pincode.trim(),

        latitude: null,

        longitude: null,

    };


    console.log(
        "Sending complaint:",
        complaintData
    );


    setLoading(true);


    try {

        // ==========================================
        // CREATE COMPLAINT API
        // ==========================================

        const response =
            await api.post(

                `/complaints/citizen/${citizenId}`,

                complaintData

            );


        console.log(
            "Complaint created:",
            response.data
        );


        // ==========================================
        // SUCCESS MESSAGE
        // ==========================================

        alert(
            "🎉 Complaint Submitted Successfully!"
        );


        // ==========================================
        // RESET FORM
        // ==========================================

        resetForm();


        // ==========================================
        // REDIRECT TO TRACK COMPLAINT
        // ==========================================

        navigate(
            "/citizen/track"
        );

    } catch (error) {

        console.error(
            "Complaint submission failed:",
            error
        );


        if (error.response) {

            alert(
                error.response.data?.message ||
                "Failed to submit complaint."
            );

        }

        else if (error.request) {

            alert(
                "Unable to connect to server. Please make sure Spring Boot is running."
            );

        }

        else {

            alert(
                "Something went wrong. Please try again."
            );

        }

    } finally {

        setLoading(false);

    }

};


return (

    <div className="form-page">

        <div className="form-container">

            <h1>
                Submit Complaint
            </h1>


            <p className="subtitle">
                Register a new civic issue.
            </p>


            <div className="form-card">


                {/* =========================
                    COMPLAINT DETAILS
                ========================= */}

                <div className="section-card">

                    <h2>
                        Complaint Details
                    </h2>


                    <div className="form-group">

                        <label>
                            Complaint Title
                        </label>


                        <input

                            type="text"

                            placeholder="Enter complaint title"

                            value={title}

                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }

                        />

                    </div>


                    <div className="row">


                        {/* CATEGORY */}

                        <div className="form-group">

                            <label>
                                Category
                            </label>


                            <select

                                value={category}

                                onChange={(e) =>
                                    setCategory(
                                        e.target.value
                                    )
                                }

                            >

                                <option value="">
                                    Select Category
                                </option>

                                <option>
                                    Road Damage
                                </option>

                                <option>
                                    Water Leakage
                                </option>

                                <option>
                                    Street Light
                                </option>

                                <option>
                                    Garbage
                                </option>

                                <option>
                                    Drainage
                                </option>

                            </select>

                        </div>


                        {/* PRIORITY */}

                        <div className="form-group">

                            <label>
                                Priority
                            </label>


                            <select

                                value={priority}

                                onChange={(e) =>
                                    setPriority(
                                        e.target.value
                                    )
                                }

                            >

                                <option value="">
                                    Select Priority
                                </option>

                                <option>
                                    High
                                </option>

                                <option>
                                    Medium
                                </option>

                                <option>
                                    Low
                                </option>

                                <option>
                                    Critical
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* =========================
                    LOCATION DETAILS
                ========================= */}

                <div className="section-card">

                    <h2>
                        Location Details
                    </h2>


                    <div className="form-group">

                        <label>
                            Location
                        </label>


                        <input

                            type="text"

                            placeholder="Sector, Area, Landmark..."

                            value={location}

                            onChange={(e) =>
                                setLocation(
                                    e.target.value
                                )
                            }

                        />

                    </div>


                    <div className="row">


                        <div className="form-group">

                            <label>
                                City
                            </label>


                            <input

                                type="text"

                                placeholder="Gurgaon"

                                value={city}

                                onChange={(e) =>
                                    setCity(
                                        e.target.value
                                    )
                                }

                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Pincode
                            </label>


                            <input

                                type="text"

                                placeholder="122001"

                                value={pincode}

                                onChange={(e) =>
                                    setPincode(
                                        e.target.value
                                    )
                                }

                            />

                        </div>

                    </div>

                </div>


                {/* =========================
                    DESCRIPTION
                ========================= */}

                <div className="section-card">

                    <h2>
                        Description & Evidence
                    </h2>


                    <div className="form-group">

                        <label>
                            Description
                        </label>


                        <textarea

                            rows="6"

                            maxLength="500"

                            value={description}

                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }

                            placeholder="Describe your complaint..."

                        />


                        <p className="counter">

                            {description.length}
                            {" / "}
                            500 Characters

                        </p>

                    </div>


                    {/* IMAGE UI ONLY */}

                    <div className="form-group">

                        <label>
                            Upload Evidence
                        </label>


                        <div className="upload-box">

                            <input

                                type="file"

                                id="image"

                                hidden

                                accept="image/*"

                                onChange={(e) => {

                                    if (
                                        e.target.files[0]
                                    ) {

                                        setImage(

                                            URL.createObjectURL(

                                                e.target.files[0]

                                            )

                                        );

                                    }

                                }}

                            />


                            <label htmlFor="image">

                                📷

                                <h3>
                                    Upload Complaint Image
                                </h3>

                                <p>
                                    Click to choose an image
                                </p>

                            </label>

                        </div>


                        {image && (

                            <div className="preview">

                                <img

                                    src={image}

                                    alt="Preview"

                                />

                            </div>

                        )}

                    </div>

                </div>


                {/* =========================
                    CONFIRMATION
                ========================= */}

                <div className="checkbox">

                    <input

                        type="checkbox"

                        checked={agree}

                        onChange={(e) =>
                            setAgree(
                                e.target.checked
                            )
                        }

                    />


                    <span>

                        I confirm that the information
                        provided is correct.

                    </span>

                </div>


                {/* =========================
                    BUTTONS
                ========================= */}

                <div className="form-actions">


                    <button
                        type="button"
                        className="secondary-btn"
                    >

                        Save Draft

                    </button>


                    <button

                        type="button"

                        className="secondary-btn"

                        onClick={
                            resetForm
                        }

                        disabled={loading}

                    >

                        Reset

                    </button>


                    <button

                        type="button"

                        className="submit-btn"

                        onClick={
                            handleSubmit
                        }

                        disabled={loading}

                    >

                        {loading
                            ? "Submitting..."
                            : "Submit Complaint"
                        }

                    </button>

                </div>

            </div>

        </div>

    </div>

);


}

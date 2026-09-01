import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import complaintService from "../../services/complaintService";


export default function RecentComplaints() {

    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ==========================================
    // FETCH RECENT COMPLAINTS
    // ==========================================

    useEffect(() => {

        const fetchRecentComplaints = async () => {

            try {

                setLoading(true);

                setError("");


                // ==========================================
                // GET ACTUAL CITIZEN ID
                // ==========================================

                const citizenId =
                    localStorage.getItem("citizenId");


                if (!citizenId) {

                    console.error(
                        "Citizen ID not found in localStorage"
                    );

                    setError(
                        "Citizen information not found. Please login again."
                    );

                    return;

                }


                console.log(
                    "Fetching recent complaints for citizen:",
                    citizenId
                );


                // ==========================================
                // FETCH CITIZEN COMPLAINTS
                // ==========================================

                const response =
                    await complaintService
                        .getComplaintsByCitizen(
                            citizenId
                        );


                console.log(
                    "Recent complaints response:",
                    response
                );


                if (response.success) {

                    const allComplaints =
                        response.data || [];


                    // ==========================================
                    // SORT BY LATEST COMPLAINT
                    // ==========================================

                    const recent =
                        [...allComplaints]
                            .sort(
                                (a, b) => {

                                    const dateA =
                                        new Date(
                                            a.submittedAt ||
                                            a.createdAt ||
                                            0
                                        );

                                    const dateB =
                                        new Date(
                                            b.submittedAt ||
                                            b.createdAt ||
                                            0
                                        );

                                    return dateB - dateA;

                                }
                            )
                            .slice(0, 5);


                    setComplaints(recent);

                }

                else {

                    setError(
                        response.message ||
                        "Failed to load complaints."
                    );

                }

            }

            catch (error) {

                console.error(
                    "Error loading recent complaints:",
                    error
                );


                if (error.response) {

                    console.error(
                        "Server response:",
                        error.response.data
                    );

                }


                setError(
                    error.response?.data?.message ||
                    "Failed to load recent complaints."
                );

            }

            finally {

                setLoading(false);

            }

        };


        fetchRecentComplaints();

    }, []);


    // ==========================================
    // STATUS CLASS
    // ==========================================

    const getStatusClass = (status) => {

        switch (status?.toUpperCase()) {

            case "PENDING":
                return "pending";

            case "ASSIGNED":
            case "IN_PROGRESS":
                return "progress";

            case "RESOLVED":
            case "CLOSED":
                return "resolved";

            case "REJECTED":
                return "rejected";

            default:
                return "pending";

        }

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="table-card">

            <div className="section-header">

                <h2>
                    Recent Complaints
                </h2>


                <button
                    className="secondary-btn"
                    onClick={() =>
                        navigate("/citizen/track")
                    }
                >

                    View All

                </button>

            </div>


            {/* LOADING */}

            {loading ? (

                    <div
                        style={{
                            padding: "30px",
                            textAlign: "center"
                        }}
                    >

                        Loading complaints...

                    </div>

                )


                /* ERROR */

                : error ? (

                        <div
                            style={{
                                padding: "30px",
                                textAlign: "center"
                            }}
                        >

                            {error}

                        </div>

                    )


                    /* NO COMPLAINTS */

                    : complaints.length === 0 ? (

                            <div
                                style={{
                                    padding: "30px",
                                    textAlign: "center"
                                }}
                            >

                                No complaints found.

                            </div>

                        )


                        /* COMPLAINT TABLE */

                        : (

                            <table>

                                <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Title</th>

                                    <th>Category</th>

                                    <th>Status</th>

                                    <th>Action</th>

                                </tr>

                                </thead>


                                <tbody>

                                {complaints.map(
                                    (complaint) => (

                                        <tr
                                            key={
                                                complaint.complaintId
                                            }
                                        >

                                            <td>

                                                CP
                                                {String(
                                                    complaint.complaintId
                                                ).padStart(
                                                    6,
                                                    "0"
                                                )}

                                            </td>


                                            <td>

                                                {
                                                    complaint.title ||
                                                    "Untitled Complaint"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    complaint.category ||
                                                    "N/A"
                                                }

                                            </td>


                                            <td>

                                        <span
                                            className={
                                                getStatusClass(
                                                    complaint.status
                                                )
                                            }
                                        >

                                            {
                                                complaint.status ||
                                                "PENDING"
                                            }

                                        </span>

                                            </td>


                                            <td>

                                                <button
                                                    className="link-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            "/citizen/track"
                                                        )
                                                    }
                                                >

                                                    View
                                                    <FaArrowRight />

                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                                </tbody>

                            </table>

                        )}

        </div>

    );

}
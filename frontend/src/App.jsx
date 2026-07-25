import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/common/ScrolltoTop.jsx";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

/* ---------------- Officer ---------------- */

import OfficerLayout from "./layouts/OfficerLayout";

import OfficerDashboard from "./pages/officer/OfficerDashboard";
import AssignedComplaints from "./pages/officer/AssignedComplaints";
import ComplaintDetails from "./pages/officer/ComplaintDetails";
import OfficerNotifications from "./pages/officer/OfficerNotifications";
import OfficerProfile from "./pages/officer/OfficerProfile";

/* ---------------- Citizen ---------------- */

import CitizenLayout from "./layouts/CitizenLayout";

import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import SubmitComplaint from "./pages/citizen/SubmitComplaint";
import TrackComplaint from "./pages/citizen/TrackComplaint";
import CitizenNotifications from "./pages/citizen/CitizenNotifications";
import CitizenFeedback from "./pages/citizen/CitizenFeedback";
import CitizenProfile from "./pages/citizen/CitizenProfile";

/* ---------------- Admin ---------------- */

import AdminDashboard from "./pages/admin/AdminDashboard";
import Analytics from "./pages/admin/Analytics.jsx";
import ManageComplaints from "./pages/admin/ManageComplaints.jsx";
import Reports from "./pages/admin/Reports.jsx";
import ManageOfficers from "./pages/admin/ManageOfficers.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminProfile from "./pages/admin/AdminProfile.jsx";
import AdminNotifications from "./pages/admin/AdminNotifications.jsx";



function App() {

    return (

        <>

            <ScrollToTop />

            <Routes>

                {/* Home */}

                <Route
                    path="/"
                    element={<Home />}
                />

                {/* Officer */}

                <Route
                    path="/officer"
                    element={<OfficerLayout />}
                >

                    <Route
                        path="dashboard"
                        element={<OfficerDashboard />}
                    />
                    <Route
                        path="assigned"
                        element={<AssignedComplaints />}
                    />
                    <Route
                        path="complaints"
                        element={<ComplaintDetails/>}
                    />

                    <Route
                        path="complaint/:id"
                        element={<ComplaintDetails />}
                    />

                    <Route
                        path="notifications"
                        element={<OfficerNotifications />}
                    />

                    <Route
                        path="profile"
                        element={<OfficerProfile />}
                    />

                </Route>

                {/* Citizen */}

                <Route
                    path="/citizen"
                    element={<CitizenLayout />}
                >

                    <Route
                        path="dashboard"
                        element={<CitizenDashboard />}
                    />

                    <Route
                        path="submit"
                        element={<SubmitComplaint />}
                    />

                    <Route
                        path="track"
                        element={<TrackComplaint />}
                    />

                    <Route
                        path="notifications"
                        element={<CitizenNotifications />}
                    />

                    <Route
                        path="feedback"
                        element={<CitizenFeedback />}
                    />

                    <Route
                        path="profile"
                        element={<CitizenProfile />}
                    />

                </Route>

                {/* Admin */}

                <Route
                    path="/admin"
                    element={<AdminLayout />}
                >

                    <Route
                        path="dashboard"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="officers"
                        element={<ManageOfficers />}
                    />

                    <Route
                        path="complaints"
                        element={<ManageComplaints />}
                    />

                    <Route
                        path="analytics"
                        element={<Analytics />}
                    />

                    <Route
                        path="reports"
                        element={<Reports />}
                    />

                    <Route
                        path="notifications"
                        element={<AdminNotifications />}
                    />

                    <Route
                        path="profile"
                        element={<AdminProfile />}
                    />

                </Route>

                {/* 404 */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </>

    );

}

export default App;
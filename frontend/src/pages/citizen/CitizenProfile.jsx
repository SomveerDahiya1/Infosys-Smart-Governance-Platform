import "../../styles/common/Forms.css";

export default function OfficerProfile() {
    return (
        <div className="form-page">
            <div className="form-container">
                <h1>My OfficerProfile</h1>

                <p className="subtitle">
                    Manage your personal information.
                </p>

                <div className="profile-card">
                    <div className="profile-header">
                        <img
                            src="https://i.pravatar.cc/150?img=12"
                            alt="OfficerProfile"
                            className="profile-image"
                        />

                        <div>
                            <h2>Somveer Dahiya</h2>

                            <p>Citizen ID : CT2026001</p>

                            <button className="secondary-btn">
                                Change Photo
                            </button>
                        </div>
                    </div>

                    <div className="section-card">
                        <h2>Personal Information</h2>

                        <div className="row">
                            <div className="form-group">
                                <label>Full Name</label>

                                <input
                                    type="text"
                                    value="Somveer Dahiya"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>

                                <input
                                    type="email"
                                    value="somveer@gmail.com"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label>Phone</label>

                                <input
                                    type="text"
                                    value="+91 9876543210"
                                />
                            </div>

                            <div className="form-group">
                                <label>City</label>

                                <input
                                    type="text"
                                    value="Gurgaon"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Address</label>

                            <textarea
                                rows="4"
                                defaultValue="Sector 14, Gurgaon, Haryana"
                            />
                        </div>
                    </div>

                    <div className="section-card">
                        <h2>Security</h2>

                        <div className="row">
                            <div className="form-group">
                                <label>Current Password</label>

                                <input
                                    type="password"
                                    placeholder="********"
                                />
                            </div>

                            <div className="form-group">
                                <label>New Password</label>

                                <input
                                    type="password"
                                    placeholder="********"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="secondary-btn">
                            Cancel
                        </button>

                        <button className="submit-btn">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
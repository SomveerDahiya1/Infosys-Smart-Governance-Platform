import { useState } from "react";
import "../../styles/common/Forms.css";

export default function SubmitComplaint() {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [location, setLocation] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [agree, setAgree] = useState(false);

    return (
        <div className="form-page">
            <div className="form-container">
                <h1>Submit Complaint</h1>

                <p className="subtitle">
                    Register a new civic issue.
                </p>

                <div className="form-card">
                    {/* Complaint Details */}
                    <div className="section-card">
                        <h2>Complaint Details</h2>

                        <div className="form-group">
                            <label>Complaint Title</label>

                            <input
                                type="text"
                                placeholder="Enter complaint title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label>Category</label>

                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    <option>Road</option>
                                    <option>Water</option>
                                    <option>Electricity</option>
                                    <option>Sanitation</option>
                                    <option>Street Light</option>
                                    <option>Traffic</option>
                                    <option>Others</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Priority</label>

                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value="">Select Priority</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className="section-card">
                        <h2>Location Details</h2>

                        <div className="form-group">
                            <label>Location</label>

                            <input
                                type="text"
                                placeholder="Sector, Area, Landmark..."
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label>City</label>

                                <input
                                    type="text"
                                    placeholder="Gurgaon"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Pincode</label>

                                <input
                                    type="text"
                                    placeholder="122001"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description & Evidence */}
                    <div className="section-card">
                        <h2>Description & Evidence</h2>

                        <div className="form-group">
                            <label>Description</label>

                            <textarea
                                rows="6"
                                maxLength="500"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your complaint..."
                            />

                            <p className="counter">
                                {description.length} / 500 Characters
                            </p>
                        </div>

                        <div className="form-group">
                            <label>Upload Evidence</label>

                            <div className="upload-box">
                                <input
                                    type="file"
                                    id="image"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files[0]) {
                                            setImage(
                                                URL.createObjectURL(e.target.files[0])
                                            );
                                        }
                                    }}
                                />

                                <label htmlFor="image">
                                    📷
                                    <h3>Upload Complaint Image</h3>
                                    <p>Click to choose an image</p>
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

                    {/* Confirmation */}
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />

                        <span>
                            I confirm that the information provided is correct.
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="form-actions">
                        <button className="secondary-btn">
                            Save Draft
                        </button>

                        <button
                            className="secondary-btn"
                            onClick={() => {
                                setTitle("");
                                setCategory("");
                                setPriority("");
                                setLocation("");
                                setCity("");
                                setPincode("");
                                setDescription("");
                                setImage(null);
                                setAgree(false);
                            }}
                        >
                            Reset
                        </button>

                        <button
                            className="submit-btn"
                            onClick={() => {
                                if (
                                    !title ||
                                    !category ||
                                    !priority ||
                                    !location ||
                                    !city ||
                                    !pincode ||
                                    !description ||
                                    !agree
                                ) {
                                    alert("Please fill all required fields.");
                                    return;
                                }

                                alert("🎉 Complaint Submitted Successfully!");
                            }}
                        >
                            Submit Complaint
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
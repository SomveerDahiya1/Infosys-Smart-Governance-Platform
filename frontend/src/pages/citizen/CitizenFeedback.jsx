import { useState } from "react";
import "../../styles/common/Forms.css";

export default function CitizenFeedback() {
    const [rating, setRating] = useState(0);
    const [experience, setExperience] = useState("");

    return (
        <div className="form-page">
            <div className="form-container">
                <h1>Feedback</h1>

                <p className="subtitle">
                    Help us improve CivicPulse by sharing your experience.
                </p>

                <div className="form-card">
                    {/* Rating */}
                    <div className="section-card">
                        <h2>Rate Your Experience</h2>

                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={star <= rating ? "star active-star" : "star"}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Complaint */}
                    <div className="section-card">
                        <h2>Select Complaint</h2>

                        <select>
                            <option>CP2026001</option>
                            <option>CP2026002</option>
                            <option>CP2026003</option>
                        </select>
                    </div>

                    {/* Experience */}
                    <div className="section-card">
                        <h2>Overall Experience</h2>

                        <div className="emoji-container">
                            <button
                                type="button"
                                className={experience === "Excellent" ? "submit-btn" : ""}
                                onClick={() => setExperience("Excellent")}
                            >
                                😍 Excellent
                            </button>

                            <button
                                type="button"
                                className={experience === "Good" ? "submit-btn" : ""}
                                onClick={() => setExperience("Good")}
                            >
                                😊 Good
                            </button>

                            <button
                                type="button"
                                className={experience === "Average" ? "submit-btn" : ""}
                                onClick={() => setExperience("Average")}
                            >
                                😐 Average
                            </button>

                            <button
                                type="button"
                                className={experience === "Poor" ? "submit-btn" : ""}
                                onClick={() => setExperience("Poor")}
                            >
                                🙁 Poor
                            </button>

                            <button
                                type="button"
                                className={experience === "Very Poor" ? "submit-btn" : ""}
                                onClick={() => setExperience("Very Poor")}
                            >
                                😡 Very Poor
                            </button>
                        </div>
                    </div>

                    {/* Feedback */}
                    <div className="section-card">
                        <h2>Your Feedback</h2>

                        <textarea
                            rows="6"
                            placeholder="Write your feedback here..."
                        ></textarea>
                    </div>

                    {/* Recommendation */}
                    <div className="section-card">
                        <h2>Would you recommend CivicPulse?</h2>

                        <div className="recommend">
                            <label>
                                <input
                                    type="radio"
                                    name="recommend"
                                />
                                Yes
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="recommend"
                                />
                                No
                            </label>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="form-actions">
                        <button
                            type="button"
                            className="secondary-btn"
                        >
                            Clear
                        </button>

                        <button
                            type="button"
                            className="submit-btn"
                        >
                            Submit Feedback
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
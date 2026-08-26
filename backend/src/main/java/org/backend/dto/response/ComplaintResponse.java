package org.backend.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ComplaintResponse {

    private Long complaintId;

    private String title;

    private String description;

    private String category;

    private String priority;

    private String status;


    // ==========================================
    // CITIZEN
    // ==========================================

    private String citizenName;

    private Long citizenId;

    private String email;

    private String phoneNumber;


    // ==========================================
    // LOCATION
    // ==========================================

    private String addressLine;

    private String area;

    private String city;

    private String state;

    private String pincode;


    // ==========================================
    // DATES
    // ==========================================

    private LocalDateTime submittedAt;

    private LocalDate estimatedCompletionDate;

    private LocalDateTime resolvedAt;

    private LocalDateTime closedAt;


    // ==========================================
    // ASSIGNMENT
    // ==========================================

    private Long assignedOfficerId;

    private String assignedOfficerName;

    private String assignedOfficerEmail;

    private String assignedByName;

    private LocalDateTime assignedAt;

    private String assignmentRemarks;


    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public ComplaintResponse() {
    }


    // ==========================================
    // COMPLAINT
    // ==========================================

    public Long getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Long complaintId) {
        this.complaintId = complaintId;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    // ==========================================
    // CITIZEN
    // ==========================================

    public String getCitizenName() {
        return citizenName;
    }

    public void setCitizenName(String citizenName) {
        this.citizenName = citizenName;
    }


    public Long getCitizenId() {
        return citizenId;
    }

    public void setCitizenId(Long citizenId) {
        this.citizenId = citizenId;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }


    // ==========================================
    // LOCATION
    // ==========================================

    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }


    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }


    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }


    // ==========================================
    // DATES
    // ==========================================

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(
            LocalDateTime submittedAt
    ) {
        this.submittedAt = submittedAt;
    }


    public LocalDate getEstimatedCompletionDate() {
        return estimatedCompletionDate;
    }

    public void setEstimatedCompletionDate(
            LocalDate estimatedCompletionDate
    ) {
        this.estimatedCompletionDate =
                estimatedCompletionDate;
    }


    public LocalDateTime getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(
            LocalDateTime resolvedAt
    ) {
        this.resolvedAt = resolvedAt;
    }


    public LocalDateTime getClosedAt() {
        return closedAt;
    }

    public void setClosedAt(
            LocalDateTime closedAt
    ) {
        this.closedAt = closedAt;
    }


    // ==========================================
    // ASSIGNMENT
    // ==========================================

    public Long getAssignedOfficerId() {
        return assignedOfficerId;
    }

    public void setAssignedOfficerId(
            Long assignedOfficerId
    ) {
        this.assignedOfficerId =
                assignedOfficerId;
    }


    public String getAssignedOfficerName() {
        return assignedOfficerName;
    }

    public void setAssignedOfficerName(
            String assignedOfficerName
    ) {
        this.assignedOfficerName =
                assignedOfficerName;
    }


    public String getAssignedOfficerEmail() {
        return assignedOfficerEmail;
    }

    public void setAssignedOfficerEmail(
            String assignedOfficerEmail
    ) {
        this.assignedOfficerEmail =
                assignedOfficerEmail;
    }


    public String getAssignedByName() {
        return assignedByName;
    }

    public void setAssignedByName(
            String assignedByName
    ) {
        this.assignedByName =
                assignedByName;
    }


    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(
            LocalDateTime assignedAt
    ) {
        this.assignedAt =
                assignedAt;
    }


    public String getAssignmentRemarks() {
        return assignmentRemarks;
    }

    public void setAssignmentRemarks(
            String assignmentRemarks
    ) {
        this.assignmentRemarks =
                assignmentRemarks;
    }

}
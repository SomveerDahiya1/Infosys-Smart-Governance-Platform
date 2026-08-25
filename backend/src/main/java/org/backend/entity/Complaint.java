package org.backend.entity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "complaint_id")
    private Long complaintId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "citizen_id", nullable = false)
    private Citizen citizen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private ComplaintCategory category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "priority_id", nullable = false)
    private ComplaintPriority priority;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", nullable = false)
    private ComplaintStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(
            name = "description",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String description;

    @Column(name = "submitted_at", nullable = false)
    private LocalDateTime submittedAt;

    @Column(name = "estimated_completion_date")
    private LocalDate estimatedCompletionDate;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @Column(name = "closed_at")
    private LocalDateTime closedAt;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;


    public Complaint() {
    }


    @PrePersist
    public void prePersist() {

        LocalDateTime now = LocalDateTime.now();

        this.createdAt = now;
        this.updatedAt = now;

        if (this.submittedAt == null) {
            this.submittedAt = now;
        }
    }


    @PreUpdate
    public void preUpdate() {

        this.updatedAt = LocalDateTime.now();
    }


    public Long getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Long complaintId) {
        this.complaintId = complaintId;
    }

    public Citizen getCitizen() {
        return citizen;
    }

    public void setCitizen(Citizen citizen) {
        this.citizen = citizen;
    }

    public ComplaintCategory getCategory() {
        return category;
    }

    public void setCategory(ComplaintCategory category) {
        this.category = category;
    }

    public ComplaintPriority getPriority() {
        return priority;
    }

    public void setPriority(ComplaintPriority priority) {
        this.priority = priority;
    }

    public ComplaintStatus getStatus() {
        return status;
    }

    public void setStatus(ComplaintStatus status) {
        this.status = status;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
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

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
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

    public void setResolvedAt(LocalDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
    }

    public LocalDateTime getClosedAt() {
        return closedAt;
    }

    public void setClosedAt(LocalDateTime closedAt) {
        this.closedAt = closedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}


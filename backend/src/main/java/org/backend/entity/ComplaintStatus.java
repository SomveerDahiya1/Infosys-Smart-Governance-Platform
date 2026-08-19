package org.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "complaint_statuses")
public class ComplaintStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id")
    private Short statusId;

    @Column(
            name = "status_name",
            nullable = false,
            unique = true,
            length = 30
    )
    private String statusName;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "is_final", nullable = false)
    private Boolean isFinal;


    public ComplaintStatus() {
    }


    public Short getStatusId() {
        return statusId;
    }

    public void setStatusId(Short statusId) {
        this.statusId = statusId;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsFinal() {
        return isFinal;
    }

    public void setIsFinal(Boolean isFinal) {
        this.isFinal = isFinal;
    }

}
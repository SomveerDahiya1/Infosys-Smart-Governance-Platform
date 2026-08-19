package org.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "complaint_priorities")
public class ComplaintPriority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "priority_id")
    private Short priorityId;

    @Column(
            name = "priority_name",
            nullable = false,
            unique = true,
            length = 30
    )
    private String priorityName;

    @Column(
            name = "priority_level",
            nullable = false,
            unique = true
    )
    private Short priorityLevel;

    @Column(name = "description", length = 255)
    private String description;


    public ComplaintPriority() {
    }


    public Short getPriorityId() {
        return priorityId;
    }

    public void setPriorityId(Short priorityId) {
        this.priorityId = priorityId;
    }

    public String getPriorityName() {
        return priorityName;
    }

    public void setPriorityName(String priorityName) {
        this.priorityName = priorityName;
    }

    public Short getPriorityLevel() {
        return priorityLevel;
    }

    public void setPriorityLevel(Short priorityLevel) {
        this.priorityLevel = priorityLevel;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
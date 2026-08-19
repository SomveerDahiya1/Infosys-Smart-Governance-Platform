package org.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "notification_types")
public class NotificationType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_type_id")
    private Short notificationTypeId;

    @Column(
            name = "type_name",
            nullable = false,
            unique = true,
            length = 50
    )
    private String typeName;

    @Column(name = "description", length = 255)
    private String description;


    public NotificationType() {
    }


    public Short getNotificationTypeId() {
        return notificationTypeId;
    }

    public void setNotificationTypeId(Short notificationTypeId) {
        this.notificationTypeId = notificationTypeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
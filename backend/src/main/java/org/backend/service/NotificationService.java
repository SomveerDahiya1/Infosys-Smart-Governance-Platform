package org.backend.service;

import org.backend.entity.Complaint;
import org.backend.entity.Notification;
import org.backend.entity.NotificationType;
import org.backend.entity.User;
import org.backend.exception.ResourceNotFoundException;
import org.backend.repository.NotificationRepository;
import org.backend.repository.NotificationTypeRepository;
import org.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationTypeRepository notificationTypeRepository;
    private final UserRepository userRepository;

    public NotificationService(
            NotificationRepository notificationRepository,
            NotificationTypeRepository notificationTypeRepository,
            UserRepository userRepository
    ) {
        this.notificationRepository = notificationRepository;
        this.notificationTypeRepository = notificationTypeRepository;
        this.userRepository = userRepository;
    }


    // ==========================================
    // CREATE COMPLAINT NOTIFICATION
    // ==========================================

    @Transactional
    public Notification createComplaintNotification(
            User user,
            Complaint complaint,
            String title,
            String message
    ) {

        NotificationType notificationType =
                notificationTypeRepository
                        .findByTypeName("COMPLAINT_UPDATE")
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Notification type COMPLAINT_UPDATE not found"
                                )
                        );

        Notification notification =
                new Notification();

        notification.setUser(user);
        notification.setNotificationType(notificationType);
        notification.setComplaint(complaint);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setIsRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        return notificationRepository.save(notification);
    }


    // ==========================================
    // GET USER NOTIFICATIONS
    // ==========================================

    @Transactional(readOnly = true)
    public List<Notification> getUserNotifications(
            Long userId
    ) {

        if (!userRepository.existsById(userId)) {

            throw new ResourceNotFoundException(
                    "User not found"
            );
        }

        return notificationRepository
                .findByUserUserIdOrderByCreatedAtDesc(userId);
    }


    // ==========================================
    // GET UNREAD NOTIFICATIONS
    // ==========================================

    @Transactional(readOnly = true)
    public List<Notification> getUnreadNotifications(
            Long userId
    ) {

        if (!userRepository.existsById(userId)) {

            throw new ResourceNotFoundException(
                    "User not found"
            );
        }

        return notificationRepository
                .findByUserUserIdAndIsReadFalse(userId);
    }


    // ==========================================
    // MARK NOTIFICATION AS READ
    // ==========================================

    @Transactional
    public Notification markAsRead(
            Long notificationId
    ) {

        Notification notification =
                notificationRepository
                        .findById(notificationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Notification not found"
                                )
                        );

        notification.setIsRead(true);
        notification.setReadAt(LocalDateTime.now());

        return notificationRepository.save(notification);
    }
}
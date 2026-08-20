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
        this.notificationTypeRepository =
                notificationTypeRepository;
        this.userRepository = userRepository;
    }


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
                                        "Notification type not found"
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

        return notificationRepository.save(notification);
    }


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

        return notificationRepository.save(notification);
    }

}
package org.backend.controller;

import org.backend.dto.response.ApiResponse;
import org.backend.entity.Notification;
import org.backend.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService
    ) {
        this.notificationService = notificationService;
    }


    // ==========================================
    // GET ALL NOTIFICATIONS OF A USER
    // ==========================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<Notification>>>
    getUserNotifications(
            @PathVariable Long userId
    ) {

        List<Notification> notifications =
                notificationService.getUserNotifications(userId);

        ApiResponse<List<Notification>> response =
                new ApiResponse<>(
                        true,
                        "Notifications fetched successfully",
                        notifications
                );

        return ResponseEntity.ok(response);
    }


    // ==========================================
    // GET UNREAD NOTIFICATIONS
    // ==========================================

    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<ApiResponse<List<Notification>>>
    getUnreadNotifications(
            @PathVariable Long userId
    ) {

        List<Notification> notifications =
                notificationService.getUnreadNotifications(userId);

        ApiResponse<List<Notification>> response =
                new ApiResponse<>(
                        true,
                        "Unread notifications fetched successfully",
                        notifications
                );

        return ResponseEntity.ok(response);
    }


    // ==========================================
    // MARK AS READ
    // ==========================================

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<ApiResponse<Notification>>
    markAsRead(
            @PathVariable Long notificationId
    ) {

        Notification notification =
                notificationService.markAsRead(notificationId);

        ApiResponse<Notification> response =
                new ApiResponse<>(
                        true,
                        "Notification marked as read",
                        notification
                );

        return ResponseEntity.ok(response);
    }
}
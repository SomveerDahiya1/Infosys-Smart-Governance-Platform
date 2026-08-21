package org.backend.controller;

import org.backend.dto.request.FeedbackRequest;
import org.backend.dto.response.ApiResponse;
import org.backend.entity.Feedback;
import org.backend.service.FeedbackService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(
            FeedbackService feedbackService
    ) {
        this.feedbackService = feedbackService;
    }


    @PostMapping("/complaint/{complaintId}/citizen/{citizenId}")
    public ResponseEntity<ApiResponse<Feedback>> submitFeedback(
            @PathVariable Long complaintId,
            @PathVariable Long citizenId,
            @RequestBody FeedbackRequest request
    ) {

        Feedback feedback =
                feedbackService.submitFeedback(
                        complaintId,
                        citizenId,
                        request
                );

        ApiResponse<Feedback> response =
                new ApiResponse<>(
                        true,
                        "Feedback submitted successfully",
                        feedback
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }


}

package org.backend.service;

import org.backend.dto.request.FeedbackRequest;
import org.backend.entity.Citizen;
import org.backend.entity.Complaint;
import org.backend.entity.Feedback;
import org.backend.exception.ResourceNotFoundException;
import org.backend.repository.CitizenRepository;
import org.backend.repository.ComplaintRepository;
import org.backend.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final ComplaintRepository complaintRepository;
    private final CitizenRepository citizenRepository;

    public FeedbackService(
            FeedbackRepository feedbackRepository,
            ComplaintRepository complaintRepository,
            CitizenRepository citizenRepository
    ) {
        this.feedbackRepository = feedbackRepository;
        this.complaintRepository = complaintRepository;
        this.citizenRepository = citizenRepository;
    }


    public Feedback submitFeedback(
            Long complaintId,
            Long citizenId,
            FeedbackRequest request
    ) {

        Complaint complaint = complaintRepository
                .findById(complaintId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Complaint not found"
                        )
                );


        Citizen citizen = citizenRepository
                .findById(citizenId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Citizen not found"
                        )
                );


        if (!complaint.getCitizen()
                .getCitizenId()
                .equals(citizenId)) {

            throw new IllegalArgumentException(
                    "You cannot give feedback for another citizen's complaint"
            );
        }


        if (feedbackRepository
                .existsByComplaintComplaintIdAndCitizenCitizenId(
                        complaintId,
                        citizenId
                )) {

            throw new IllegalArgumentException(
                    "Feedback already submitted for this complaint"
            );
        }


        Feedback feedback = new Feedback();

        feedback.setComplaint(complaint);
        feedback.setCitizen(citizen);
        feedback.setRating(request.getRating());
        feedback.setComments(request.getComments());

        return feedbackRepository.save(feedback);
    }

}
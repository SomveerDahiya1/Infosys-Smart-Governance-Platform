package org.backend.repository;

import org.backend.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepository
        extends JpaRepository<Feedback, Long> {

    List<Feedback> findByComplaintComplaintId(Long complaintId);

    List<Feedback> findByCitizenCitizenId(Long citizenId);

    Optional<Feedback> findByComplaintComplaintIdAndCitizenCitizenId(
            Long complaintId,
            Long citizenId
    );

}
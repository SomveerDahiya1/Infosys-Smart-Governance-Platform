package org.backend.repository;

import org.backend.entity.ComplaintAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComplaintAssignmentRepository
        extends JpaRepository<ComplaintAssignment, Long> {

    List<ComplaintAssignment> findByComplaintComplaintId(Long complaintId);

    List<ComplaintAssignment> findByOfficerOfficerId(Long officerId);

    Optional<ComplaintAssignment> findByComplaintComplaintIdAndIsCurrentTrue(
            Long complaintId
    );

    List<ComplaintAssignment> findByOfficerOfficerIdAndIsCurrentTrue(
            Long officerId
    );

}
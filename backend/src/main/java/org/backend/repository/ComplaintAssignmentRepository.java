package org.backend.repository;

import org.backend.entity.ComplaintAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComplaintAssignmentRepository
        extends JpaRepository<ComplaintAssignment, Long> {


    // Get complete assignment history of a complaint
    List<ComplaintAssignment>
    findByComplaintComplaintId(
            Long complaintId
    );


    // Get complete assignment history of an officer
    List<ComplaintAssignment>
    findByOfficerOfficerId(
            Long officerId
    );


    // Get current active assignment of a complaint
    Optional<ComplaintAssignment>
    findByComplaintComplaintIdAndIsCurrentTrue(
            Long complaintId
    );


    // Get all currently assigned complaints of an officer
    List<ComplaintAssignment>
    findByOfficerOfficerIdAndIsCurrentTrue(
            Long officerId
    );

}
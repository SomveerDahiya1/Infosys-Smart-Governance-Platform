package org.backend.repository;

import org.backend.entity.ComplaintAssignment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComplaintAssignmentRepository
        extends JpaRepository<ComplaintAssignment, Long> {


    // ==========================================
    // GET COMPLETE ASSIGNMENT HISTORY OF COMPLAINT
    // ==========================================

    List<ComplaintAssignment>
    findByComplaintComplaintId(
            Long complaintId
    );


    // ==========================================
    // GET COMPLETE ASSIGNMENT HISTORY OF OFFICER
    // ==========================================

    List<ComplaintAssignment>
    findByOfficerOfficerId(
            Long officerId
    );


    // ==========================================
    // GET CURRENT ACTIVE ASSIGNMENT OF COMPLAINT
    // ==========================================

    Optional<ComplaintAssignment>
    findByComplaintComplaintIdAndIsCurrentTrue(
            Long complaintId
    );


    // ==========================================
    // GET ALL CURRENT ASSIGNMENTS OF OFFICER
    // ==========================================

    List<ComplaintAssignment>
    findByOfficerOfficerIdAndIsCurrentTrue(
            Long officerId
    );


    // ==========================================
    // GET OFFICER WORKLOAD
    //
    // Only:
    // 1. Current assignment
    // 2. Complaint status = IN_PROGRESS
    // ==========================================

    long countByOfficerOfficerIdAndIsCurrentTrueAndComplaintStatusStatusName(
            Long officerId,
            String statusName
    );
}
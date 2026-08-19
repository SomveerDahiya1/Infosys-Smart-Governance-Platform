package org.backend.repository;

import org.backend.entity.ComplaintAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintAttachmentRepository
        extends JpaRepository<ComplaintAttachment, Long> {

    List<ComplaintAttachment> findByComplaintComplaintId(Long complaintId);

}
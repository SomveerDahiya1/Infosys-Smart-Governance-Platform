package org.backend.repository;

import org.backend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository
        extends JpaRepository<Complaint, Long> {

    List<Complaint> findByCitizenCitizenId(
            Long citizenId
    );

    List<Complaint> findByStatusStatusId(
            Short statusId
    );

    List<Complaint> findByPriorityPriorityId(
            Short priorityId
    );

    List<Complaint> findByCategoryCategoryId(
            Long categoryId
    );

    Long countByStatusStatusName(
            String statusName
    );
}
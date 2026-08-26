package org.backend.repository;

import org.backend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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


    // ==========================================
    // MULTI FILTER
    // ==========================================

    @Query("""
            SELECT c
            FROM Complaint c
            WHERE (:statusId IS NULL
                   OR c.status.statusId = :statusId)

            AND (:priorityId IS NULL
                 OR c.priority.priorityId = :priorityId)

            AND (:categoryId IS NULL
                 OR c.category.categoryId = :categoryId)

            ORDER BY c.submittedAt DESC
            """)
    List<Complaint> findByFilters(
            @Param("statusId") Short statusId,
            @Param("priorityId") Short priorityId,
            @Param("categoryId") Long categoryId
    );
}
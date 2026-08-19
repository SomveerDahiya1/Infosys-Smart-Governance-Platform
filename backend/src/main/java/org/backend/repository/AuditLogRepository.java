package org.backend.repository;

import org.backend.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditLogRepository
        extends JpaRepository<AuditLog, Long> {

    List<AuditLog> findByUserUserId(Long userId);

    List<AuditLog> findByEntityTypeAndEntityId(
            String entityType,
            Long entityId
    );

}
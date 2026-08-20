package org.backend.repository;
import org.backend.entity.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NotificationTypeRepository
        extends JpaRepository<NotificationType, Short> {
    Optional<NotificationType> findByTypeName(String typeName);

}
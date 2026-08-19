package org.backend.repository;

import org.backend.entity.ComplaintPriority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ComplaintPriorityRepository
        extends JpaRepository<ComplaintPriority, Short> {

    Optional<ComplaintPriority> findByPriorityName(String priorityName);

    Optional<ComplaintPriority> findByPriorityLevel(Short priorityLevel);

}
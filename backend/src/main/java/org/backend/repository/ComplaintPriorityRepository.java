package org.backend.repository;

import org.backend.entity.ComplaintPriority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintPriorityRepository
        extends JpaRepository<ComplaintPriority, Short> {

    List<ComplaintPriority> findAllByOrderByPriorityLevelAsc();
}
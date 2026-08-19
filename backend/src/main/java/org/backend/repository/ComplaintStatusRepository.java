package org.backend.repository;

import org.backend.entity.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ComplaintStatusRepository
        extends JpaRepository<ComplaintStatus, Short> {

    Optional<ComplaintStatus> findByStatusName(String statusName);

}
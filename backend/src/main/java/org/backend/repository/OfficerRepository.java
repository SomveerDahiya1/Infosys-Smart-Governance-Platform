package org.backend.repository;

import org.backend.entity.Officer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OfficerRepository extends JpaRepository<Officer, Long> {

    Optional<Officer> findByUserUserId(Long userId);

    Optional<Officer> findByEmployeeCode(String employeeCode);

}
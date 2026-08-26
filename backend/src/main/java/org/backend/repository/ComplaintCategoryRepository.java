package org.backend.repository;

import org.backend.entity.ComplaintCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintCategoryRepository
        extends JpaRepository<ComplaintCategory, Long> {

    List<ComplaintCategory> findByIsActiveTrue();

    List<ComplaintCategory>
    findByIsActiveTrueOrderByCategoryNameAsc();
}
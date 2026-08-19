package org.backend.repository;

import org.backend.entity.ComplaintCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ComplaintCategoryRepository
        extends JpaRepository<ComplaintCategory, Long> {

    Optional<ComplaintCategory> findByCategoryName(String categoryName);

}
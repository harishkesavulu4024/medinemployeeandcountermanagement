package com.medin.counter.management.service;

import com.medin.counter.management.service.dto.BranchDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.medin.counter.management.domain.Branch}.
 */
public interface BranchService {
    /**
     * Save a branch.
     *
     * @param branchDTO the entity to save.
     * @return the persisted entity.
     */
    BranchDTO save(BranchDTO branchDTO);

    /**
     * Updates a branch.
     *
     * @param branchDTO the entity to update.
     * @return the persisted entity.
     */
    BranchDTO update(BranchDTO branchDTO);

    /**
     * Partially updates a branch.
     *
     * @param branchDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<BranchDTO> partialUpdate(BranchDTO branchDTO);

    /**
     * Get all the branches.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BranchDTO> findAll(Pageable pageable);

    /**
     * Get the "id" branch.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BranchDTO> findOne(Long id);

    /**
     * Delete the "id" branch.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    List<String> getAllBranchesNames();
}

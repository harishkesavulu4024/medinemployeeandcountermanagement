package com.medin.counter.management.service;

import com.medin.counter.management.service.dto.StockSellerInfoDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.medin.counter.management.domain.StockSellerInfo}.
 */
public interface StockSellerInfoService {
    /**
     * Save a stockSellerInfo.
     *
     * @param stockSellerInfoDTO the entity to save.
     * @return the persisted entity.
     */
    StockSellerInfoDTO save(StockSellerInfoDTO stockSellerInfoDTO);

    /**
     * Updates a stockSellerInfo.
     *
     * @param stockSellerInfoDTO the entity to update.
     * @return the persisted entity.
     */
    StockSellerInfoDTO update(StockSellerInfoDTO stockSellerInfoDTO);

    /**
     * Partially updates a stockSellerInfo.
     *
     * @param stockSellerInfoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StockSellerInfoDTO> partialUpdate(StockSellerInfoDTO stockSellerInfoDTO);

    /**
     * Get all the stockSellerInfos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<StockSellerInfoDTO> findAll(Pageable pageable);

    /**
     * Get all the stockSellerInfos with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<StockSellerInfoDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" stockSellerInfo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StockSellerInfoDTO> findOne(Long id);

    /**
     * Delete the "id" stockSellerInfo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

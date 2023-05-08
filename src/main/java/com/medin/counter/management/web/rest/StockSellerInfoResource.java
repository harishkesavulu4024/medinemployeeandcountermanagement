package com.medin.counter.management.web.rest;

import com.medin.counter.management.repository.StockSellerInfoRepository;
import com.medin.counter.management.service.StockSellerInfoService;
import com.medin.counter.management.service.dto.StockSellerInfoDTO;
import com.medin.counter.management.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.medin.counter.management.domain.StockSellerInfo}.
 */
@RestController
@RequestMapping("/api")
public class StockSellerInfoResource {

    private final Logger log = LoggerFactory.getLogger(StockSellerInfoResource.class);

    private static final String ENTITY_NAME = "stockSellerInfo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StockSellerInfoService stockSellerInfoService;

    private final StockSellerInfoRepository stockSellerInfoRepository;

    public StockSellerInfoResource(StockSellerInfoService stockSellerInfoService, StockSellerInfoRepository stockSellerInfoRepository) {
        this.stockSellerInfoService = stockSellerInfoService;
        this.stockSellerInfoRepository = stockSellerInfoRepository;
    }

    /**
     * {@code POST  /stock-seller-infos} : Create a new stockSellerInfo.
     *
     * @param stockSellerInfoDTO the stockSellerInfoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new stockSellerInfoDTO, or with status {@code 400 (Bad Request)} if the stockSellerInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stock-seller-infos")
    public ResponseEntity<StockSellerInfoDTO> createStockSellerInfo(@Valid @RequestBody StockSellerInfoDTO stockSellerInfoDTO)
        throws URISyntaxException {
        log.debug("REST request to save StockSellerInfo : {}", stockSellerInfoDTO);
        if (stockSellerInfoDTO.getId() != null) {
            throw new BadRequestAlertException("A new stockSellerInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StockSellerInfoDTO result = stockSellerInfoService.save(stockSellerInfoDTO);
        return ResponseEntity
            .created(new URI("/api/stock-seller-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stock-seller-infos/:id} : Updates an existing stockSellerInfo.
     *
     * @param id the id of the stockSellerInfoDTO to save.
     * @param stockSellerInfoDTO the stockSellerInfoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stockSellerInfoDTO,
     * or with status {@code 400 (Bad Request)} if the stockSellerInfoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the stockSellerInfoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stock-seller-infos/{id}")
    public ResponseEntity<StockSellerInfoDTO> updateStockSellerInfo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody StockSellerInfoDTO stockSellerInfoDTO
    ) throws URISyntaxException {
        log.debug("REST request to update StockSellerInfo : {}, {}", id, stockSellerInfoDTO);
        if (stockSellerInfoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, stockSellerInfoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!stockSellerInfoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        StockSellerInfoDTO result = stockSellerInfoService.update(stockSellerInfoDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, stockSellerInfoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /stock-seller-infos/:id} : Partial updates given fields of an existing stockSellerInfo, field will ignore if it is null
     *
     * @param id the id of the stockSellerInfoDTO to save.
     * @param stockSellerInfoDTO the stockSellerInfoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stockSellerInfoDTO,
     * or with status {@code 400 (Bad Request)} if the stockSellerInfoDTO is not valid,
     * or with status {@code 404 (Not Found)} if the stockSellerInfoDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the stockSellerInfoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/stock-seller-infos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StockSellerInfoDTO> partialUpdateStockSellerInfo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody StockSellerInfoDTO stockSellerInfoDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update StockSellerInfo partially : {}, {}", id, stockSellerInfoDTO);
        if (stockSellerInfoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, stockSellerInfoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!stockSellerInfoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StockSellerInfoDTO> result = stockSellerInfoService.partialUpdate(stockSellerInfoDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, stockSellerInfoDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /stock-seller-infos} : get all the stockSellerInfos.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stockSellerInfos in body.
     */
    @GetMapping("/stock-seller-infos")
    public ResponseEntity<List<StockSellerInfoDTO>> getAllStockSellerInfos(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        @RequestParam(required = false, defaultValue = "false") boolean eagerload
    ) {
        log.debug("REST request to get a page of StockSellerInfos");
        Page<StockSellerInfoDTO> page;
        if (eagerload) {
            page = stockSellerInfoService.findAllWithEagerRelationships(pageable);
        } else {
            page = stockSellerInfoService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /stock-seller-infos/:id} : get the "id" stockSellerInfo.
     *
     * @param id the id of the stockSellerInfoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stockSellerInfoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stock-seller-infos/{id}")
    public ResponseEntity<StockSellerInfoDTO> getStockSellerInfo(@PathVariable Long id) {
        log.debug("REST request to get StockSellerInfo : {}", id);
        Optional<StockSellerInfoDTO> stockSellerInfoDTO = stockSellerInfoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(stockSellerInfoDTO);
    }

    /**
     * {@code DELETE  /stock-seller-infos/:id} : delete the "id" stockSellerInfo.
     *
     * @param id the id of the stockSellerInfoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stock-seller-infos/{id}")
    public ResponseEntity<Void> deleteStockSellerInfo(@PathVariable Long id) {
        log.debug("REST request to delete StockSellerInfo : {}", id);
        stockSellerInfoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}

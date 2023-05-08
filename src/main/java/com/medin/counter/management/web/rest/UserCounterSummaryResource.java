package com.medin.counter.management.web.rest;

import com.medin.counter.management.repository.UserCounterSummaryRepository;
import com.medin.counter.management.service.UserCounterSummaryService;
import com.medin.counter.management.service.dto.BranchDTO;
import com.medin.counter.management.service.dto.UserCounterSummaryDTO;
import com.medin.counter.management.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing the current user's couter summary.
 */
@RestController
@RequestMapping("/api")
public class UserCounterSummaryResource {

    private final Logger log = LoggerFactory.getLogger(AddressResource.class);

    private static final String ENTITY_NAME = "userCounterSummary";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private UserCounterSummaryService userCounterSummaryService;

    private UserCounterSummaryRepository userCounterSummaryRepository;

    public UserCounterSummaryResource(
        UserCounterSummaryService userCounterSummaryService,
        UserCounterSummaryRepository userCounterSummaryRepository
    ) {
        this.userCounterSummaryService = userCounterSummaryService;
        this.userCounterSummaryRepository = userCounterSummaryRepository;
    }

    @PostMapping("/usercountersummary")
    public ResponseEntity<UserCounterSummaryDTO> createUserCounterSummary(@Valid @RequestBody UserCounterSummaryDTO userCounterSummaryDTO)
        throws URISyntaxException {
        log.debug("REST request to save Branch : {}", userCounterSummaryDTO);
        if (userCounterSummaryDTO.getId() != null) {
            throw new BadRequestAlertException("A new counter summary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserCounterSummaryDTO result = userCounterSummaryService.save(userCounterSummaryDTO);
        return ResponseEntity
            .created(new URI("/api/usercountersummary/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /branches} : get all the branches.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of branches in body.
     */
    @GetMapping("/usercountersummaries")
    public ResponseEntity<List<UserCounterSummaryDTO>> getAllUserCounterSummaries(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of Branches");
        Page<UserCounterSummaryDTO> page = userCounterSummaryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /branches/:id} : get the "id" branch.
     *
     * @param id the id of the branchDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the branchDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/usercountersummary/{id}")
    public ResponseEntity<UserCounterSummaryDTO> getUserCounterSummary(@PathVariable Long id) {
        log.debug("REST request to get Branch : {}", id);
        Optional<UserCounterSummaryDTO> branchDTO = userCounterSummaryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(branchDTO);
    }

    /**
     * {@code DELETE  /branches/:id} : delete the "id" branch.
     *
     * @param id the id of the branchDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/usercountersummary/{id}")
    public ResponseEntity<Void> deleteUserCounterSummary(@PathVariable Long id) {
        log.debug("REST request to delete Branch : {}", id);
        userCounterSummaryService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }

    @PutMapping("/usercountersummary/{id}")
    public ResponseEntity<UserCounterSummaryDTO> updateBranch(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody UserCounterSummaryDTO userCounterSummaryDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Branch : {}, {}", id, userCounterSummaryDTO);
        if (userCounterSummaryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userCounterSummaryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userCounterSummaryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UserCounterSummaryDTO result = userCounterSummaryService.update(userCounterSummaryDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userCounterSummaryDTO.getId().toString()))
            .body(result);
    }
}

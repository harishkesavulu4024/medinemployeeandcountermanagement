package com.medin.counter.management.service;

import com.medin.counter.management.service.dto.UserCounterSummaryDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface UserCounterSummaryService {
    UserCounterSummaryDTO save(UserCounterSummaryDTO userCounterSummaryDTO);

    @Transactional(readOnly = true)
    Page<UserCounterSummaryDTO> findAll(Pageable pageable);

    @Transactional(readOnly = true)
    Optional<UserCounterSummaryDTO> findOne(Long id);

    void delete(Long id);

    UserCounterSummaryDTO update(UserCounterSummaryDTO userCounterSummaryDTO);
}

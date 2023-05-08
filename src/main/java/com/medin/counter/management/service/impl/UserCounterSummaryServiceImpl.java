package com.medin.counter.management.service.impl;

import com.medin.counter.management.domain.UserCounterSummary;
import com.medin.counter.management.repository.UserCounterSummaryRepository;
import com.medin.counter.management.service.UserCounterSummaryService;
import com.medin.counter.management.service.dto.UserCounterSummaryDTO;
import com.medin.counter.management.service.mapper.UserCounterSummaryMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserCounterSummaryServiceImpl implements UserCounterSummaryService {

    private final Logger log = LoggerFactory.getLogger(BranchServiceImpl.class);

    private UserCounterSummaryRepository userCounterSummaryRepository;

    private UserCounterSummaryMapper userCounterSummaryMapper;

    public UserCounterSummaryServiceImpl(
        UserCounterSummaryRepository userCounterSummaryRepository,
        UserCounterSummaryMapper userCounterSummaryMapper
    ) {
        this.userCounterSummaryRepository = userCounterSummaryRepository;
        this.userCounterSummaryMapper = userCounterSummaryMapper;
    }

    @Override
    public UserCounterSummaryDTO save(UserCounterSummaryDTO userCounterSummaryDTO) {
        log.debug("Request to save user counter summary : {}", userCounterSummaryDTO);
        UserCounterSummary userCounterSummary = userCounterSummaryMapper.toEntity(userCounterSummaryDTO);
        userCounterSummary = userCounterSummaryRepository.save(userCounterSummary);
        return userCounterSummaryMapper.toDto(userCounterSummary);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserCounterSummaryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all userCounterSummary");
        return userCounterSummaryRepository.findAll(pageable).map(userCounterSummaryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserCounterSummaryDTO> findOne(Long id) {
        log.debug("Request to get userCounterSummary : {}", id);
        return userCounterSummaryRepository.findById(id).map(userCounterSummaryMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete userCounterSummary : {}", id);
        userCounterSummaryRepository.deleteById(id);
    }

    @Override
    public UserCounterSummaryDTO update(UserCounterSummaryDTO userCounterSummaryDTO) {
        log.debug("Request to update userCounterSummary : {}", userCounterSummaryDTO);
        UserCounterSummary userCounterSummary = userCounterSummaryMapper.toEntity(userCounterSummaryDTO);
        userCounterSummary = userCounterSummaryRepository.save(userCounterSummary);
        return userCounterSummaryMapper.toDto(userCounterSummary);
    }
}

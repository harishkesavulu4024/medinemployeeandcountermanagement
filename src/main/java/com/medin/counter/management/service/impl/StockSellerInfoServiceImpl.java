package com.medin.counter.management.service.impl;

import com.medin.counter.management.domain.StockSellerInfo;
import com.medin.counter.management.repository.StockSellerInfoRepository;
import com.medin.counter.management.service.StockSellerInfoService;
import com.medin.counter.management.service.dto.StockSellerInfoDTO;
import com.medin.counter.management.service.mapper.StockSellerInfoMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link StockSellerInfo}.
 */
@Service
@Transactional
public class StockSellerInfoServiceImpl implements StockSellerInfoService {

    private final Logger log = LoggerFactory.getLogger(StockSellerInfoServiceImpl.class);

    private final StockSellerInfoRepository stockSellerInfoRepository;

    private final StockSellerInfoMapper stockSellerInfoMapper;

    public StockSellerInfoServiceImpl(StockSellerInfoRepository stockSellerInfoRepository, StockSellerInfoMapper stockSellerInfoMapper) {
        this.stockSellerInfoRepository = stockSellerInfoRepository;
        this.stockSellerInfoMapper = stockSellerInfoMapper;
    }

    @Override
    public StockSellerInfoDTO save(StockSellerInfoDTO stockSellerInfoDTO) {
        log.debug("Request to save StockSellerInfo : {}", stockSellerInfoDTO);
        StockSellerInfo stockSellerInfo = stockSellerInfoMapper.toEntity(stockSellerInfoDTO);
        stockSellerInfo = stockSellerInfoRepository.save(stockSellerInfo);
        return stockSellerInfoMapper.toDto(stockSellerInfo);
    }

    @Override
    public StockSellerInfoDTO update(StockSellerInfoDTO stockSellerInfoDTO) {
        log.debug("Request to update StockSellerInfo : {}", stockSellerInfoDTO);
        StockSellerInfo stockSellerInfo = stockSellerInfoMapper.toEntity(stockSellerInfoDTO);
        stockSellerInfo = stockSellerInfoRepository.save(stockSellerInfo);
        return stockSellerInfoMapper.toDto(stockSellerInfo);
    }

    @Override
    public Optional<StockSellerInfoDTO> partialUpdate(StockSellerInfoDTO stockSellerInfoDTO) {
        log.debug("Request to partially update StockSellerInfo : {}", stockSellerInfoDTO);

        return stockSellerInfoRepository
            .findById(stockSellerInfoDTO.getId())
            .map(existingStockSellerInfo -> {
                stockSellerInfoMapper.partialUpdate(existingStockSellerInfo, stockSellerInfoDTO);

                return existingStockSellerInfo;
            })
            .map(stockSellerInfoRepository::save)
            .map(stockSellerInfoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StockSellerInfoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all StockSellerInfos");
        return stockSellerInfoRepository.findAll(pageable).map(stockSellerInfoMapper::toDto);
    }

    public Page<StockSellerInfoDTO> findAllWithEagerRelationships(Pageable pageable) {
        return stockSellerInfoRepository.findAllWithEagerRelationships(pageable).map(stockSellerInfoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StockSellerInfoDTO> findOne(Long id) {
        log.debug("Request to get StockSellerInfo : {}", id);
        return stockSellerInfoRepository.findOneWithEagerRelationships(id).map(stockSellerInfoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete StockSellerInfo : {}", id);
        stockSellerInfoRepository.deleteById(id);
    }
}

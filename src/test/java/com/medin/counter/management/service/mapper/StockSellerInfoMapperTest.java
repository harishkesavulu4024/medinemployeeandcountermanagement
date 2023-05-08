package com.medin.counter.management.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StockSellerInfoMapperTest {

    private StockSellerInfoMapper stockSellerInfoMapper;

    @BeforeEach
    public void setUp() {
        stockSellerInfoMapper = new StockSellerInfoMapperImpl();
    }
}

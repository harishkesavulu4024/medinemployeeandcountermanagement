package com.medin.counter.management.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.medin.counter.management.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StockSellerInfoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StockSellerInfo.class);
        StockSellerInfo stockSellerInfo1 = new StockSellerInfo();
        stockSellerInfo1.setId(1L);
        StockSellerInfo stockSellerInfo2 = new StockSellerInfo();
        stockSellerInfo2.setId(stockSellerInfo1.getId());
        assertThat(stockSellerInfo1).isEqualTo(stockSellerInfo2);
        stockSellerInfo2.setId(2L);
        assertThat(stockSellerInfo1).isNotEqualTo(stockSellerInfo2);
        stockSellerInfo1.setId(null);
        assertThat(stockSellerInfo1).isNotEqualTo(stockSellerInfo2);
    }
}

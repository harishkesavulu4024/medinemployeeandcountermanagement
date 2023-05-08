package com.medin.counter.management.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.medin.counter.management.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StockSellerInfoDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StockSellerInfoDTO.class);
        StockSellerInfoDTO stockSellerInfoDTO1 = new StockSellerInfoDTO();
        stockSellerInfoDTO1.setId(1L);
        StockSellerInfoDTO stockSellerInfoDTO2 = new StockSellerInfoDTO();
        assertThat(stockSellerInfoDTO1).isNotEqualTo(stockSellerInfoDTO2);
        stockSellerInfoDTO2.setId(stockSellerInfoDTO1.getId());
        assertThat(stockSellerInfoDTO1).isEqualTo(stockSellerInfoDTO2);
        stockSellerInfoDTO2.setId(2L);
        assertThat(stockSellerInfoDTO1).isNotEqualTo(stockSellerInfoDTO2);
        stockSellerInfoDTO1.setId(null);
        assertThat(stockSellerInfoDTO1).isNotEqualTo(stockSellerInfoDTO2);
    }
}

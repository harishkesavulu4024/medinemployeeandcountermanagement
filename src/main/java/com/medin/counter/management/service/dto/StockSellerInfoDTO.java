package com.medin.counter.management.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.medin.counter.management.domain.StockSellerInfo} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StockSellerInfoDTO implements Serializable {

    private Long id;

    @NotNull
    private String distributorName;

    @NotNull
    private ZonedDateTime paymentDate;

    @NotNull
    private BigDecimal totalAmount;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDistributorName() {
        return distributorName;
    }

    public void setDistributorName(String distributorName) {
        this.distributorName = distributorName;
    }

    public ZonedDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(ZonedDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StockSellerInfoDTO)) {
            return false;
        }

        StockSellerInfoDTO stockSellerInfoDTO = (StockSellerInfoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, stockSellerInfoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StockSellerInfoDTO{" +
            "id=" + getId() +
            ", distributorName='" + getDistributorName() + "'" +
            ", paymentDate='" + getPaymentDate() + "'" +
            ", totalAmount=" + getTotalAmount() +
            ", user=" + getUser() +
            "}";
    }
}

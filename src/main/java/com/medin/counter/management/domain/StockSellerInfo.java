package com.medin.counter.management.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A StockSellerInfo.
 */
@Entity
@Table(name = "stock_seller_info")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StockSellerInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "distributor_name", nullable = false)
    private String distributorName;

    @NotNull
    @Column(name = "payment_date", nullable = false)
    private ZonedDateTime paymentDate;

    @NotNull
    @Column(name = "total_amount", precision = 21, scale = 2, nullable = false)
    private BigDecimal totalAmount;

    @ManyToOne(optional = false)
    @NotNull
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public StockSellerInfo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDistributorName() {
        return this.distributorName;
    }

    public StockSellerInfo distributorName(String distributorName) {
        this.setDistributorName(distributorName);
        return this;
    }

    public void setDistributorName(String distributorName) {
        this.distributorName = distributorName;
    }

    public ZonedDateTime getPaymentDate() {
        return this.paymentDate;
    }

    public StockSellerInfo paymentDate(ZonedDateTime paymentDate) {
        this.setPaymentDate(paymentDate);
        return this;
    }

    public void setPaymentDate(ZonedDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public BigDecimal getTotalAmount() {
        return this.totalAmount;
    }

    public StockSellerInfo totalAmount(BigDecimal totalAmount) {
        this.setTotalAmount(totalAmount);
        return this;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public StockSellerInfo user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StockSellerInfo)) {
            return false;
        }
        return id != null && id.equals(((StockSellerInfo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StockSellerInfo{" +
            "id=" + getId() +
            ", distributorName='" + getDistributorName() + "'" +
            ", paymentDate='" + getPaymentDate() + "'" +
            ", totalAmount=" + getTotalAmount() +
            "}";
    }
}

package com.medin.counter.management.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

public class UserCounterSummaryDTO implements Serializable {

    private Long id;

    private Instant openingTime;

    private Instant closingTime;

    private String notes;

    private BigDecimal totalAmount;

    private Map<String, String> denominations;

    private BranchDTO branch;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(Instant openingTime) {
        this.openingTime = openingTime;
    }

    public Instant getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(Instant closingTime) {
        this.closingTime = closingTime;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Map<String, String> getDenominations() {
        return denominations;
    }

    public void setDenominations(Map<String, String> denominations) {
        this.denominations = denominations;
    }

    public BranchDTO getBranch() {
        return branch;
    }

    public void setBranch(BranchDTO branch) {
        this.branch = branch;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}

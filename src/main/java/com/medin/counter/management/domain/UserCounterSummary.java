package com.medin.counter.management.domain;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

@Entity
@Table(name = "user_counter_summary")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class UserCounterSummary extends AbstractAuditingEntity<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private Map<String, String> denominations;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    @NotNull
    private Branch branch;

    @NotNull
    @Column(name = "total_amount", precision = 21, scale = 2, nullable = false)
    private BigDecimal totalAmount;

    @NotNull
    @Column(name = "opening_time")
    private Instant openingTime;

    @NotNull
    @Column(name = "closing_time")
    private Instant closingTime;

    private String notes;

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Map<String, String> getDenominations() {
        return denominations;
    }

    public void setDenominations(Map<String, String> denominations) {
        this.denominations = denominations;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof User)) {
            return false;
        }
        return id != null && id.equals(((UserCounterSummary) o).id);
    }

    @Override
    public String toString() {
        return (
            "UserCounterSummary{" +
            "id=" +
            id +
            ", denominations=" +
            denominations +
            ", user=" +
            user +
            ", branch=" +
            branch +
            ", totalAmount=" +
            totalAmount +
            ", openingTime=" +
            openingTime +
            ", closingTime=" +
            closingTime +
            ", notes='" +
            notes +
            '\'' +
            '}'
        );
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }
}

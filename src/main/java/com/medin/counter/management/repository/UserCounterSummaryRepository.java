package com.medin.counter.management.repository;

import com.medin.counter.management.domain.UserCounterSummary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCounterSummaryRepository extends JpaRepository<UserCounterSummary, Long> {}

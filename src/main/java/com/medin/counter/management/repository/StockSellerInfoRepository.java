package com.medin.counter.management.repository;

import com.medin.counter.management.domain.StockSellerInfo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the StockSellerInfo entity.
 */
@Repository
public interface StockSellerInfoRepository extends JpaRepository<StockSellerInfo, Long> {
    @Query("select stockSellerInfo from StockSellerInfo stockSellerInfo where stockSellerInfo.user.login = ?#{principal.username}")
    List<StockSellerInfo> findByUserIsCurrentUser();

    default Optional<StockSellerInfo> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<StockSellerInfo> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<StockSellerInfo> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct stockSellerInfo from StockSellerInfo stockSellerInfo left join fetch stockSellerInfo.user",
        countQuery = "select count(distinct stockSellerInfo) from StockSellerInfo stockSellerInfo"
    )
    Page<StockSellerInfo> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct stockSellerInfo from StockSellerInfo stockSellerInfo left join fetch stockSellerInfo.user")
    List<StockSellerInfo> findAllWithToOneRelationships();

    @Query("select stockSellerInfo from StockSellerInfo stockSellerInfo left join fetch stockSellerInfo.user where stockSellerInfo.id =:id")
    Optional<StockSellerInfo> findOneWithToOneRelationships(@Param("id") Long id);
}

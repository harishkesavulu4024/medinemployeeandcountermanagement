package com.medin.counter.management.service.mapper;

import com.medin.counter.management.domain.StockSellerInfo;
import com.medin.counter.management.domain.User;
import com.medin.counter.management.service.dto.StockSellerInfoDTO;
import com.medin.counter.management.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link StockSellerInfo} and its DTO {@link StockSellerInfoDTO}.
 */
@Mapper(componentModel = "spring")
public interface StockSellerInfoMapper extends EntityMapper<StockSellerInfoDTO, StockSellerInfo> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    StockSellerInfoDTO toDto(StockSellerInfo s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}

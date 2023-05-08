package com.medin.counter.management.service.mapper;

import com.medin.counter.management.domain.User;
import com.medin.counter.management.domain.UserCounterSummary;
import com.medin.counter.management.service.dto.UserCounterSummaryDTO;
import com.medin.counter.management.service.dto.UserDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface UserCounterSummaryMapper extends EntityMapper<UserCounterSummaryDTO, UserCounterSummary> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    UserCounterSummaryDTO toDto(UserCounterSummary userCounterSummary);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}

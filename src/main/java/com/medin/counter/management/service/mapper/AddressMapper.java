package com.medin.counter.management.service.mapper;

import com.medin.counter.management.domain.Address;
import com.medin.counter.management.service.dto.AddressDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Address} and its DTO {@link AddressDTO}.
 */
@Mapper(componentModel = "spring")
public interface AddressMapper extends EntityMapper<AddressDTO, Address> {}

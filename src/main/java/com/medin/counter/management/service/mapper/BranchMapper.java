package com.medin.counter.management.service.mapper;

import com.medin.counter.management.domain.Address;
import com.medin.counter.management.domain.Branch;
import com.medin.counter.management.service.dto.AddressDTO;
import com.medin.counter.management.service.dto.BranchDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Branch} and its DTO {@link BranchDTO}.
 */
@Mapper(componentModel = "spring")
public interface BranchMapper extends EntityMapper<BranchDTO, Branch> {
    @Mapping(target = "address", source = "address", qualifiedByName = "addressId")
    BranchDTO toDto(Branch s);

    @Named("addressId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AddressDTO toDtoAddressId(Address address);
}

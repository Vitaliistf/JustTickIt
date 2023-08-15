package org.vitaliistf.todo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.vitaliistf.todo.dto.response.StatResponseDto;
import org.vitaliistf.todo.models.Stat;

@Mapper(config = MapperConfig.class)
public interface StatMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "completedTotal", target = "completedTotal")
    @Mapping(source = "uncompletedTotal", target = "uncompletedTotal")
    StatResponseDto toDto(Stat stat);
}


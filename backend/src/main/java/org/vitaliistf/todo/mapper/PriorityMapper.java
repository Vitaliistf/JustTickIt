package org.vitaliistf.todo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.vitaliistf.todo.dto.request.PriorityRequestDto;
import org.vitaliistf.todo.dto.response.PriorityResponseDto;
import org.vitaliistf.todo.models.Priority;

@Mapper(config = MapperConfig.class)
public interface PriorityMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "title", target = "title")
    @Mapping(source = "color", target = "color")
    PriorityResponseDto toDto(Priority priority);

    @Mapping(ignore = true, target = "id")
    @Mapping(source = "title", target = "title")
    @Mapping(source = "color", target = "color")
    Priority toModel(PriorityRequestDto dto);
}

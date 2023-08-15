package org.vitaliistf.todo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.vitaliistf.todo.dto.request.TaskRequestDto;
import org.vitaliistf.todo.dto.response.TaskResponseDto;
import org.vitaliistf.todo.models.Task;

@Mapper(config = MapperConfig.class)
public interface TaskMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "title", target = "title")
    @Mapping(source = "completed", target = "completed")
    @Mapping(source = "date", target = "date")
    @Mapping(source = "priority", target = "priority")
    @Mapping(source = "category", target = "category")
    TaskResponseDto toDto(Task task);

    @Mapping(ignore = true, target = "id")
    @Mapping(source = "title", target = "title")
    @Mapping(source = "completed", target = "completed")
    @Mapping(source = "date", target = "date")
    @Mapping(source = "priority", target = "priority")
    @Mapping(source = "category", target = "category")
    Task toModel(TaskRequestDto dto);
}

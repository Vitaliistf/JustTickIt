package org.vitaliistf.todo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.vitaliistf.todo.dto.request.CategoryRequestDto;
import org.vitaliistf.todo.dto.response.CategoryResponseDto;
import org.vitaliistf.todo.models.Category;

@Mapper(config = MapperConfig.class)
public interface CategoryMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "title", target = "title")
    @Mapping(source = "completedCount", target = "completedCount")
    @Mapping(source = "uncompletedCount", target = "uncompletedCount")
    CategoryResponseDto toDto(Category category);

    @Mapping(ignore = true, target = "id")
    @Mapping(source = "title", target = "title")
    @Mapping(source = "completedCount", target = "completedCount")
    @Mapping(source = "uncompletedCount", target = "uncompletedCount")
    Category toModel(CategoryRequestDto dto);
}

package org.vitaliistf.todo.dto.response;

import lombok.Data;

@Data
public class CategoryResponseDto {
    private Long id;
    private String title;
    private Long completedCount;
    private Long uncompletedCount;
}

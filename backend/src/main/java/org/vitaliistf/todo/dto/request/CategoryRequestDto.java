package org.vitaliistf.todo.dto.request;

import lombok.Data;

@Data
public class CategoryRequestDto {
    private String title;
    private Long completedCount;
    private Long uncompletedCount;
}

package org.vitaliistf.todo.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequestDto {
    @NotBlank(message = "Title cannot be blank.")
    private String title;
    private Long completedCount;
    private Long uncompletedCount;
}

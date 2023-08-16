package org.vitaliistf.todo.dto.request;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import lombok.Data;
import org.vitaliistf.todo.models.Category;
import org.vitaliistf.todo.models.Priority;

@Data
public class TaskRequestDto {
    @NotBlank(message = "Title cannot be blank.")
    private String title;
    private Integer completed;
    private LocalDateTime date;
    private Priority priority;
    private Category category;
}

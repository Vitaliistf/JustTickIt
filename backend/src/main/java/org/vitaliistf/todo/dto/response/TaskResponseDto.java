package org.vitaliistf.todo.dto.response;

import java.time.LocalDateTime;
import lombok.Data;
import org.vitaliistf.todo.models.Category;
import org.vitaliistf.todo.models.Priority;

@Data
public class TaskResponseDto {
    private Long id;
    private String title;
    private Boolean completed;
    private LocalDateTime date;
    private Priority priority;
    private Category category;
}

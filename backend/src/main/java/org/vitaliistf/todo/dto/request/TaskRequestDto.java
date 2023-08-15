package org.vitaliistf.todo.dto.request;

import java.time.LocalDateTime;
import lombok.Data;
import org.vitaliistf.todo.models.Category;
import org.vitaliistf.todo.models.Priority;

@Data
public class TaskRequestDto {
    private String title;
    private Integer completed;
    private LocalDateTime date;
    private Priority priority;
    private Category category;
}

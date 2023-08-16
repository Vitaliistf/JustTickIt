package org.vitaliistf.todo.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PriorityRequestDto {
    @NotBlank(message = "Title cannot be blank.")
    private String title;
    @NotBlank(message = "Color cannot be blank.")
    private String color;
}

package org.vitaliistf.todo.exception;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private int status;
    private List<String> errors;
    private LocalDateTime timestamp;
}

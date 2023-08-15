package org.vitaliistf.todo.dto.response;

import lombok.Data;

@Data
public class StatResponseDto {
    private Long id;
    private Long completedTotal;
    private Long uncompletedTotal;
}

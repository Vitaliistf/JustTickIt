package org.vitaliistf.todo.search;

import lombok.Data;

@Data
public class TaskSearchObject {

    private String title;
    private Integer completed;
    private Long priorityId;
    private Long categoryId;

    private Integer pageNumber;
    private Integer pageSize;

    private String sortColumn;
    private String sortDirection;

}

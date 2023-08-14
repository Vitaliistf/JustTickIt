package org.vitaliistf.todo.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.vitaliistf.todo.models.Task;

import java.util.List;

public interface TaskService {
    List<Task> findAll();

    Task save(Task task);

    Task update(Long id, Task task);

    void deleteById(Long id);

    Page<Task> findByParams(String text, Integer completed, Long priorityId, Long categoryId, PageRequest paging);

    Task findById(Long id);
}

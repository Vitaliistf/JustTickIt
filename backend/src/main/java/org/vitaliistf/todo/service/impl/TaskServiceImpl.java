package org.vitaliistf.todo.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.vitaliistf.todo.models.Task;
import org.vitaliistf.todo.repository.TaskRepository;
import org.vitaliistf.todo.service.TaskService;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public Task update(Long id, Task task) {
        Task taskFromDb = findById(id);

        taskFromDb.setCategory(task.getCategory());
        taskFromDb.setDate(task.getDate());
        taskFromDb.setTitle(task.getTitle());
        taskFromDb.setPriority(task.getPriority());
        taskFromDb.setCompleted(task.getCompleted());

        return taskRepository.save(taskFromDb);
    }

    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }

    public Page<Task> findByParams(String text, Integer completed,
                                   Long priorityId, Long categoryId, PageRequest paging) {
        return taskRepository.findByParams(text, completed, priorityId, categoryId, paging);
    }

    public Task findById(Long id) {
        return taskRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Cannot find such task.")
        );
    }

}

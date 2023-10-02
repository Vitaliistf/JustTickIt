package org.vitaliistf.todo.contoller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.vitaliistf.todo.dto.request.TaskRequestDto;
import org.vitaliistf.todo.dto.response.TaskResponseDto;
import org.vitaliistf.todo.mapper.TaskMapper;
import org.vitaliistf.todo.models.Task;
import org.vitaliistf.todo.search.TaskSearchObject;
import org.vitaliistf.todo.service.TaskService;

@RestController
@RequestMapping("/task")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    private final TaskService taskService;
    private final TaskMapper taskMapper;

    @GetMapping
    public List<TaskResponseDto> findAll() {
        return taskService.findAll()
                .stream()
                .map(taskMapper::toDto)
                .toList();
    }

    @PostMapping
    public TaskResponseDto add(@RequestBody @Valid TaskRequestDto taskRequestDto) {
        Task task = taskMapper.toModel(taskRequestDto);
        return taskMapper.toDto(taskService.save(task));
    }

    @PutMapping("/{id}")
    public TaskResponseDto update(@PathVariable Long id,
                                  @RequestBody @Valid TaskRequestDto taskRequestDto) {
        Task task = taskMapper.toModel(taskRequestDto);
        return taskMapper.toDto(taskService.update(id, task));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        taskService.deleteById(id);
    }

    @GetMapping("/{id}")
    public TaskResponseDto findById(@PathVariable Long id) {
        return taskMapper.toDto(taskService.findById(id));
    }

    @PostMapping("/search")
    public Page<TaskResponseDto> search(@RequestBody @Valid TaskSearchObject taskSearchValues) {

        String text = taskSearchValues.getTitle();

        Integer completed = taskSearchValues.getCompleted();

        Long priorityId = taskSearchValues.getPriorityId();
        Long categoryId = taskSearchValues.getCategoryId();

        String sortColumn = taskSearchValues.getSortColumn();
        String sortDirection = taskSearchValues.getSortDirection();

        Integer pageNumber = taskSearchValues.getPageNumber();
        Integer pageSize = taskSearchValues.getPageSize();

        Sort.Direction direction = sortDirection == null
                || sortDirection.trim().isEmpty()
                || sortDirection.trim().equals("asc")
                ? Sort.Direction.ASC : Sort.Direction.DESC;

        Sort sort = Sort.by(direction, sortColumn);

        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, sort);

        return taskService.findByParams(text, completed, priorityId, categoryId, pageRequest)
                .map(taskMapper::toDto);

    }

}

package org.vitaliistf.todo.contoller;

import jakarta.validation.Valid;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.vitaliistf.todo.dto.request.PriorityRequestDto;
import org.vitaliistf.todo.dto.response.PriorityResponseDto;
import org.vitaliistf.todo.mapper.PriorityMapper;
import org.vitaliistf.todo.models.Priority;
import org.vitaliistf.todo.search.SimpleSearchObject;
import org.vitaliistf.todo.service.PriorityService;

@RestController
@RequestMapping("/priority")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PriorityController {

    private final PriorityService priorityService;
    private final PriorityMapper priorityMapper;

    @GetMapping
    public List<PriorityResponseDto> findAll() {
        return priorityService.findAll()
                .stream()
                .map(priorityMapper::toDto)
                .toList();
    }

    @PostMapping
    public PriorityResponseDto save(@RequestBody @Valid PriorityRequestDto priorityRequestDto) {
        Priority priority = priorityMapper.toModel(priorityRequestDto);
        return priorityMapper.toDto(priorityService.save(priority));
    }

    @PutMapping("/{id}")
    public PriorityResponseDto update(@PathVariable Long id,
                                      @RequestBody @Valid PriorityRequestDto priorityRequestDto) {
        Priority priority = priorityMapper.toModel(priorityRequestDto);
        return priorityMapper.toDto(priorityService.update(id, priority));
    }

    @GetMapping("/{id}")
    public PriorityResponseDto findById(@PathVariable Long id) {
        return priorityMapper.toDto(priorityService.findById(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        priorityService.deleteById(id);
    }

    @PostMapping("/search")
    public List<PriorityResponseDto> search(@RequestBody SimpleSearchObject prioritySearchValues) {
        return priorityService.findByTitle(prioritySearchValues.getTitle())
                .stream()
                .map(priorityMapper::toDto)
                .toList();
    }
}

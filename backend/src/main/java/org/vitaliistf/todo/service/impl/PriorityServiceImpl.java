package org.vitaliistf.todo.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.vitaliistf.todo.models.Priority;
import org.vitaliistf.todo.repository.PriorityRepository;
import org.vitaliistf.todo.service.PriorityService;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class PriorityServiceImpl implements PriorityService {

    private final PriorityRepository priorityRepository;

    public List<Priority> findAll() {
        return priorityRepository.findAllByOrderByIdAsc();
    }

    public Priority save(Priority priority) {
        return priorityRepository.save(priority);
    }

    public Priority update(Long id, Priority priority){
        Priority priorityFromDb = findById(id);

        priorityFromDb.setTitle(priority.getTitle());
        priorityFromDb.setColor(priority.getColor());

        return priorityRepository.save(priorityFromDb);
    }

    public void deleteById(Long id){
        priorityRepository.deleteById(id);
    }

    public Priority findById(Long id){
        return priorityRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Cannot find such priority")
        );
    }

    public List<Priority> findByTitle(String text){
        return priorityRepository.findByTitle(text);
    }
}

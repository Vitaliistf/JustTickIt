package org.vitaliistf.todo.service;

import org.vitaliistf.todo.models.Priority;

import java.util.List;

public interface PriorityService {

    List<Priority> findAll();

    Priority save(Priority priority);

    Priority update(Long id, Priority priority);

    void deleteById(Long id);

    Priority findById(Long id);

    List<Priority> findByTitle(String text);
}

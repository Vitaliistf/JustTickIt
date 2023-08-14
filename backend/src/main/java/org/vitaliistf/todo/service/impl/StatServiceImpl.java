package org.vitaliistf.todo.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.vitaliistf.todo.models.Stat;
import org.vitaliistf.todo.repository.StatRepository;
import org.vitaliistf.todo.service.StatService;

import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class StatServiceImpl implements StatService {

    private final StatRepository statRepository;

    public Stat findById(Long id){
        return statRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Cannot find such stat.")
        );
    }

}

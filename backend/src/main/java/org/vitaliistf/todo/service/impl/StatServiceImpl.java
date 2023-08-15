package org.vitaliistf.todo.service.impl;

import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.vitaliistf.todo.models.Stat;
import org.vitaliistf.todo.repository.StatRepository;
import org.vitaliistf.todo.service.StatService;

@Service
@AllArgsConstructor
public class StatServiceImpl implements StatService {

    private final StatRepository statRepository;

    public Stat findOne() {
        return statRepository.findById(1L).orElseThrow(
                () -> new NoSuchElementException("Cannot find such stat.")
        );
    }

}

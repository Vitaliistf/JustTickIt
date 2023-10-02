package org.vitaliistf.todo.contoller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.vitaliistf.todo.dto.response.StatResponseDto;
import org.vitaliistf.todo.mapper.StatMapper;
import org.vitaliistf.todo.service.StatService;

@RestController
@RequestMapping("/statistics")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class StatController {

    private final StatService statService;
    private final StatMapper statMapper;

    @GetMapping
    public StatResponseDto findOne() {
        return statMapper.toDto(statService.findOne());
    }

}

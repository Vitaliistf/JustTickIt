package org.vitaliistf.todo.contoller;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.vitaliistf.todo.dto.request.CategoryRequestDto;
import org.vitaliistf.todo.dto.response.CategoryResponseDto;
import org.vitaliistf.todo.mapper.CategoryMapper;
import org.vitaliistf.todo.models.Category;
import org.vitaliistf.todo.search.SimpleSearchObject;
import org.vitaliistf.todo.service.CategoryService;

@RestController
@RequestMapping("/category")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    private final CategoryMapper categoryMapper;

    @GetMapping
    public List<CategoryResponseDto> findAll() {
        return categoryService.findAllByOrderByTitleAsc()
                .stream()
                .map(categoryMapper::toDto)
                .toList();
    }

    @PostMapping
    public CategoryResponseDto add(@RequestBody CategoryRequestDto categoryRequestDto) {
        Category category = categoryMapper.toModel(categoryRequestDto);
        return categoryMapper.toDto(categoryService.save(category));
    }

    @PutMapping("/{id}")
    public CategoryResponseDto update(@PathVariable Long id,
                                      @RequestBody CategoryRequestDto categoryRequestDto) {
        Category category = categoryMapper.toModel(categoryRequestDto);
        return categoryMapper.toDto(categoryService.update(id, category));
    }

    @GetMapping("/{id}")
    public CategoryResponseDto findById(@PathVariable Long id) {
        return categoryMapper.toDto(categoryService.findById(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoryService.deleteById(id);
    }

    @PostMapping("/search")
    public List<CategoryResponseDto> search(@RequestBody SimpleSearchObject categorySearchValues) {
        List<Category> categories = categoryService.findByTitle(categorySearchValues.getText());
        return categories
                .stream()
                .map(categoryMapper::toDto)
                .toList();
    }
}

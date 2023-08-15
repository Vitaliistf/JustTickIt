package org.vitaliistf.todo.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.vitaliistf.todo.models.Category;
import org.vitaliistf.todo.repository.CategoryRepository;
import org.vitaliistf.todo.service.CategoryService;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public Category update(Long id, Category category) {
        Category categoryFromDb = findById(id);

        categoryFromDb.setTitle(category.getTitle());
        categoryFromDb.setCompletedCount(category.getCompletedCount());
        categoryFromDb.setUncompletedCount(category.getUncompletedCount());

        return categoryRepository.save(categoryFromDb);
    }

    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    public List<Category> findByTitle(String text) {
        return categoryRepository.findByTitle(text);
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Cannot find such category")
        );
    }

    public List<Category> findAllByOrderByTitleAsc() {
        return categoryRepository.findAllByOrderByTitleAsc();
    }
}

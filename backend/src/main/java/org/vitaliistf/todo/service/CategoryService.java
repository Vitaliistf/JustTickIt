package org.vitaliistf.todo.service;

import java.util.List;
import org.vitaliistf.todo.models.Category;

public interface CategoryService {

    List<Category> findAll();

    Category save(Category category);

    Category update(Long id, Category category);

    void deleteById(Long id);

    List<Category> findByTitle(String text);

    Category findById(Long id);

    List<Category> findAllByOrderByTitleAsc();

}

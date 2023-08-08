package org.vitaliistf.todo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Entity
@Data
public class Category {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;

    @Basic
    @Column(name = "title")
    private String title;

    @Basic
    @Column(name = "completed_count")
    private Long completedCount;

    @Basic
    @Column(name = "uncompleted_count")
    private Long uncompletedCount;

    @OneToMany(mappedBy = "categoryByCategoryId")
    private Collection<Task> tasksById;
}

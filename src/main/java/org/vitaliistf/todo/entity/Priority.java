package org.vitaliistf.todo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Priority {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;

    @Basic
    @Column(name = "title")
    private String title;

    @Basic
    @Column(name = "color")
    private String color;

}

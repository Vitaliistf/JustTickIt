package org.vitaliistf.todo.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Stat {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;

    @Basic
    @Column(name = "completed_total")
    private Long completedTotal;

    @Basic
    @Column(name = "uncompleted_total")
    private Long uncompletedTotal;
}

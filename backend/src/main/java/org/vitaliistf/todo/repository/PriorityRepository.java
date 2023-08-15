package org.vitaliistf.todo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.vitaliistf.todo.models.Priority;

@Repository
public interface PriorityRepository extends JpaRepository<Priority, Long> {

    @Query("SELECT c FROM Priority c where "
            + "(:title is null or :title='' or lower(c.title) like "
            + "lower(concat('%', :title,'%')))  "
            + "order by c.title asc")
    List<Priority> findByTitle(@Param("title") String title);

    List<Priority> findAllByOrderByIdAsc();
}

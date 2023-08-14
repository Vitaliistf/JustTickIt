package org.vitaliistf.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vitaliistf.todo.entity.Stat;

@Repository
public interface StatRepository extends JpaRepository<Stat, Long> {

}

package com.project.management.fsd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.management.fsd.entity.Task;

/**
 * 
 * @author Admin : Nawap Patel - nawap_patel@yahoo.com
 *
 */
@Repository
public interface TaskManagerRepository extends JpaRepository<Task,Long>{

	@Query("SELECT count(t) FROM Task t where t.projectDetails.projectId = ?1")
	public Long getTotalTasksForProjectId(Long projectId);
}


package com.project.management.fsd.service;

import java.util.List;

import com.project.management.fsd.bo.ParentTaskVO;
import com.project.management.fsd.bo.ProjectVO;
import com.project.management.fsd.bo.TaskVO;
import com.project.management.fsd.bo.UserVO;

/**
 * 
 * @author Admin : Nawap Patel - nawap_patel@yahoo.com
 *
 */
public interface ProjectManagementService {
	/**
	 * 
	 * @return
	 */
	public List<TaskVO> retriveTasks();
	
	/**
	 * 
	 * @param task
	 */
	public void updateTask(TaskVO task);
	
	/**
	 * 
	 * @return
	 */
	public List<ParentTaskVO> retriveParentTasks();
	
	/**
	 * 
	 * @param projectId
	 * @return
	 */
	public List<ParentTaskVO> retriveParentTasksForProjectId(String projectId);
	
	/**
	 * 
	 * @param parentTask
	 */
	public void updateParentTask(ParentTaskVO parentTask);
	
	/**
	 * 
	 * @return
	 */
	public List<ProjectVO> retriveProjects();
	
	/**
	 * 
	 * @param project
	 */
	public void updateProject(ProjectVO project);
	
	/**
	 * 
	 * @return
	 */
	public List<UserVO> retriveUsers();
	
	/**
	 * 
	 * @param user
	 */
	public void updateUser(UserVO user);

}

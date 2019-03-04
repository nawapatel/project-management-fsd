package com.project.management.fsd.bo;



/**
 * 
 * @author Admin : Nawap Patel - nawap_patel@yahoo.com
 *
 */


public class ParentTaskVO {

	private Long parentTaskId;
	private String parentTaskName;
	private String projectId;

	/**
	 * 
	 * @return
	 */
	public Long getParentTaskId() {
		return parentTaskId;
	}

	/**
	 * 
	 * @param parentTaskId
	 */
	public void setParentTaskId(Long parentTaskId) {
		this.parentTaskId = parentTaskId;
	}

	/**
	 * 
	 * @return
	 */
	public String getParentTaskName() {
		return parentTaskName;
	}

	/**
	 * 
	 * @param parentTaskName
	 */
	public void setParentTaskName(String parentTaskName) {
		this.parentTaskName = parentTaskName;
	}

	/**
	 * 
	 * @return
	 */
	public String getProjectId() {
		return projectId;
	}

	/**
	 * 
	 * @param projectId
	 */
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

}

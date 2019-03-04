package com.project.management.fsd.bo;

/**
 * 
 * @author Admin : Nawap Patel - nawap_patel@yahoo.com
 *
 */
public class ProjectVO {
	private Long projectId;
	private String projectName;
	private String startDate;
	private String endDate;
	private String priority;
	private String status;
	private String managerId;
	private Long noOfTasks;

	/**
	 * 
	 * @return
	 */
	public Long getProjectId() {
		return projectId;
	}

	/**
	 * 
	 * @param projectId
	 */
	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	/**
	 * 
	 * @return
	 */
	public String getProjectName() {
		return projectName;
	}

	/**
	 * 
	 * @param projectName
	 */
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	/**
	 * 
	 * @return
	 */
	public String getStartDate() {
		return startDate;
	}

	/**
	 * 
	 * @param startDate
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	/**
	 * 
	 * @return
	 */
	public String getEndDate() {
		return endDate;
	}

	/**
	 * 
	 * @param endDate
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	/**
	 * 
	 * @return
	 */
	public String getPriority() {
		return priority;
	}

	/**
	 * 
	 * @param priority
	 */
	public void setPriority(String priority) {
		this.priority = priority;
	}

	/**
	 * 
	 * @return
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * 
	 * @param status
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * 
	 * @return
	 */
	public String getManagerId() {
		return managerId;
	}

	/**
	 * 
	 * @param managerId
	 */
	public void setManagerId(String managerId) {
		this.managerId = managerId;
	}

	/**
	 * 
	 * @return
	 */
	public Long getNoOfTasks() {
		return noOfTasks;
	}

	/**
	 * 
	 * @param noOfTasks
	 */
	public void setNoOfTasks(Long noOfTasks) {
		this.noOfTasks = noOfTasks;
	}
}

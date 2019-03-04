package com.project.management.fsd.bo;

/**
 * 
 * @author Admin : Nawap Patel - nawap_patel@yahoo.com
 *
 */
public class TaskVO {
	private Long taskId;
	private String taskName;
	private String startDate;
	private String endDate;
	private String priority;
	private String status;
	private ParentTaskVO parentTask;
	private UserVO employeeDetails;
	private ProjectVO projectDetails;

	/**
	 * 
	 * @return
	 */
	public Long getTaskId() {
		return taskId;
	}

	/**
	 * 
	 * @param taskId
	 */
	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}

	/**
	 * 
	 * @return
	 */
	public String getTaskName() {
		return taskName;
	}

	/**
	 * 
	 * @param taskName
	 */
	public void setTaskName(String taskName) {
		this.taskName = taskName;
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
	public ParentTaskVO getParentTask() {
		return parentTask;
	}

	/**
	 * 
	 * @param parentTask
	 */
	public void setParentTask(ParentTaskVO parentTask) {
		this.parentTask = parentTask;
	}

	/**
	 * 
	 * @return
	 */
	public UserVO getEmployeeDetails() {
		return employeeDetails;
	}

	/**
	 * 
	 * @param employeeDetails
	 */
	public void setEmployeeDetails(UserVO employeeDetails) {
		this.employeeDetails = employeeDetails;
	}

	/**
	 * 
	 * @return
	 */
	public ProjectVO getProjectDetails() {
		return projectDetails;
	}

	/**
	 * 
	 * @param projectDetails
	 */
	public void setProjectDetails(ProjectVO projectDetails) {
		this.projectDetails = projectDetails;
	}
}

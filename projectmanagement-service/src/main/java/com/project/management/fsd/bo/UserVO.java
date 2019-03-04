package com.project.management.fsd.bo;

/**
 * 
 * @author Admin : Nawap Patel - nawap_patel@yahoo.com
 *
 */
public class UserVO {
	private String employeeId;
	private String firstName;
	private String lastName;
	private String status;

	/**
	 * 
	 * @return
	 */
	public String getEmployeeId() {
		return employeeId;
	}

	/**
	 * 
	 * @param employeeId
	 */
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	/**
	 * 
	 * @return
	 */
	public String getFirstName() {
		return firstName;
	}

	/**
	 * 
	 * @param firstName
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * 
	 * @return
	 */
	public String getLastName() {
		return lastName;
	}

	/**
	 * 
	 * @param lastName
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
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

}

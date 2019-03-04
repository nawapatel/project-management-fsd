package com.project.management.fsd.controller;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.management.fsd.bo.ParentTaskVO;
import com.project.management.fsd.bo.ProjectVO;
import com.project.management.fsd.bo.TaskVO;
import com.project.management.fsd.bo.UserVO;
import com.project.management.fsd.controller.ProjectManagementController;
import com.project.management.fsd.service.ProjectManagementService;
/**
 * 
 * @author Admin : Nawap Patel - nawap_patel@yahoo.com
 *
 */
@RunWith(SpringRunner.class)
public class ProjectManagegementControllerTest {

	private ProjectManagementController projectManagerController;
	private ProjectManagementService projectManagerService;
	ObjectMapper mapper = new ObjectMapper();  
	
	@Before
	public void setUp() throws Exception {
		projectManagerService = Mockito.mock(ProjectManagementService.class);
		projectManagerController = new ProjectManagementController(projectManagerService);
	}

	@After
	public void tearDown() throws Exception {
		
	}
	
	@Test
	public void testHome() {
		String testhome = projectManagerController.home();
		Assert.assertEquals(testhome, "forward:/index.html");
	}
	
	
	@Test
	public void testGetTasks() throws JsonParseException, JsonMappingException, IOException {
		TypeReference<List<TaskVO>> mapType = new TypeReference<List<TaskVO>>() {};
		List<TaskVO> allTasks = null;
		ClassLoader classLoader = getClass().getClassLoader();
		File file = new File(classLoader.getResource("tasks.json").getFile());
		allTasks = mapper.readValue(file, mapType);
		when(projectManagerService.retriveTasks()).thenReturn(allTasks);
		List<TaskVO> allTasksList = projectManagerController.getTasks();
		Assert.assertNotNull(allTasksList);
		verify(projectManagerService,times(1)).retriveTasks();
		verifyNoMoreInteractions(projectManagerService);
	}
	
	@Test
	public void testUpdateTask() throws JsonParseException, JsonMappingException, IOException {
		TaskVO task = null;
		ClassLoader classLoader = getClass().getClassLoader();
		File file = new File(classLoader.getResource("task.json").getFile());
		task = mapper.readValue(file, TaskVO.class);
		doNothing().when(projectManagerService).updateTask(task);
		projectManagerController.updateTask(task);
		verify(projectManagerService,times(1)).updateTask(task);
		verifyNoMoreInteractions(projectManagerService);
	}
	
	
	@Test
	public void testGetAllParentTasks() throws JsonParseException, JsonMappingException, IOException {
		TypeReference<List<ParentTaskVO>> mapType = new TypeReference<List<ParentTaskVO>>() {};
		List<ParentTaskVO> allParentTasks = null;
		ClassLoader classLoader = getClass().getClassLoader();
		File file = new File(classLoader.getResource("parenttasks.json").getFile());
		allParentTasks = mapper.readValue(file, mapType);
		when(projectManagerService.retriveParentTasks()).thenReturn(allParentTasks);
		List<ParentTaskVO> allParentTasksList = projectManagerController.getAllParentTasks();
		Assert.assertNotNull(allParentTasksList);
		verify(projectManagerService,times(1)).retriveParentTasks();
		verifyNoMoreInteractions(projectManagerService);
	}
	
	
	@Test
	public void testGetParentTasksForProjectId() throws JsonParseException, JsonMappingException, IOException {
		TypeReference<List<ParentTaskVO>> mapType = new TypeReference<List<ParentTaskVO>>() {};
		List<ParentTaskVO> allParentTasks = null;
		String projectId = "3";
		ClassLoader classLoader = getClass().getClassLoader();
		File file = new File(classLoader.getResource("parenttaskbyprojectid.json").getFile());
		allParentTasks = mapper.readValue(file, mapType);
		when(projectManagerService.retriveParentTasksForProjectId(projectId)).thenReturn(allParentTasks);
		List<ParentTaskVO> allParentTasksList = projectManagerController.getParentTasksForProjectId(projectId);
		Assert.assertNotNull(allParentTasksList);
		verify(projectManagerService,times(1)).retriveParentTasksForProjectId(projectId);
		verifyNoMoreInteractions(projectManagerService);
	}
	
	@Test
	public void testUpdateParentTask() throws JsonParseException, JsonMappingException, IOException {
		ParentTaskVO parenttask = null;
		ClassLoader classLoader = getClass().getClassLoader();
		File file = new File(classLoader.getResource("parenttask.json").getFile());
		parenttask = mapper.readValue(file, ParentTaskVO.class);
		doNothing().when(projectManagerService).updateParentTask(parenttask);
		projectManagerController.updateParentTask(parenttask);
		verify(projectManagerService,times(1)).updateParentTask(parenttask);
		verifyNoMoreInteractions(projectManagerService);
	}
	
	

	@Test
	public void testGetProjects() throws JsonParseException, JsonMappingException, IOException {
		TypeReference<List<ProjectVO>> mapType = new TypeReference<List<ProjectVO>>() {};
		List<ProjectVO> allProjects = null;
		ClassLoader classLoader = getClass().getClassLoader();
		File file = new File(classLoader.getResource("projects.json").getFile());
		allProjects = mapper.readValue(file, mapType);
		when(projectManagerService.retriveProjects()).thenReturn(allProjects);
		List<ProjectVO> allProjectsList = projectManagerController.getProjects();
		Assert.assertNotNull(allProjectsList);
		verify(projectManagerService,times(1)).retriveProjects();
		verifyNoMoreInteractions(projectManagerService);
	}
	
	@Test
	public void testUpdateProject() throws JsonParseException, JsonMappingException, IOException {
		ProjectVO project = null;
		ClassLoader classLoader = getClass().getClassLoader();
		File file = new File(classLoader.getResource("project.json").getFile());
		project = mapper.readValue(file, ProjectVO.class);
		doNothing().when(projectManagerService).updateProject(project);
		projectManagerController.updateProject(project);
		verify(projectManagerService,times(1)).updateProject(project);
		verifyNoMoreInteractions(projectManagerService);
	}
	
	
	@Test
	public void testGetUsers() throws JsonParseException, JsonMappingException, IOException {
		TypeReference<List<UserVO>> mapType = new TypeReference<List<UserVO>>() {};
		List<UserVO> allUsers = null;
		ClassLoader classLoader = getClass().getClassLoader();
		File file = new File(classLoader.getResource("users.json").getFile());
		allUsers = mapper.readValue(file, mapType);
		when(projectManagerService.retriveUsers()).thenReturn(allUsers);
		List<UserVO> allUsersList = projectManagerController.getUsers();
		Assert.assertNotNull(allUsersList);
		verify(projectManagerService,times(1)).retriveUsers();
		verifyNoMoreInteractions(projectManagerService);
	}
	
	@Test
	public void testUpdateUsers() throws JsonParseException, JsonMappingException, IOException {
		UserVO user = null;
		ClassLoader classLoader = getClass().getClassLoader();
		File file = new File(classLoader.getResource("user.json").getFile());
		user = mapper.readValue(file, UserVO.class);
		doNothing().when(projectManagerService).updateUser(user);
		projectManagerController.updateUsers(user);
		verify(projectManagerService,times(1)).updateUser(user);
		verifyNoMoreInteractions(projectManagerService);
	}
	

}

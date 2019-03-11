# project-management-fsd - Final Certification - IIHT - Developer: Patel, Nawap

<h4>projectmanagement-service - contains the REST end-points for application </h4>
<h4>projectmanagement-gui - contains the angular 6 cli code for application</h4>

Repo: https://github.com/nawapatel/project-management-fsd.git

<b>Commands for final build:</b>
<ul>
<li>Maven build: clean install -e	[The UI code is build using "frontend-maven-plugin" and is packed inside the JAR artifacts itself. Refer projectmanagement-gui pom.xml]</li>
<li>Docker build: package docker:build	[spotify "docker-maven-plugin" is used to create image in the remote docker. <dockerHost> configuration : pom.xml of projectmanagement-service]</li>
</ul>

<b>Commands for Docker execution:</b>
<ul>
<li>dockerx run -p 9081:9081 nawapatel/nawapatel-projectmanagement-application-image:latest	[to start the image, we generated]</li>
<li>dockerx exec -it <container id> sh	[to check the below URL's are working in the curl]</li>
</ul>	

<ul>
<li>To check whether application loaded correctly use below</li>
<li>Service: curl http://localhost:9081/api/tasks</li>
<li>UI Home page: curl http://localhost:9081/index.html</li>
</ul>	

<b>Commands for local development:</b>
<ul>
<li>spring boot in projectmanagement-service folder: spring-boot:run</li>
<li>angular ui in web folder of projectmanagement-gui: npm install -> npm start</li>
</ul>

<b>Jenkins:</b>
<ul>
<li>Branches to build: */master</li>
<li>Script Path: projectmanagement-service/Jenkinsfile</li>
</ul>

<b>Note: </b>
<ul>
<li>Refer dockerfile, application screenshot document in the repo folder.</li>
<li>Refer scripts.sql for the database DDL and DML's</li>
</ul>



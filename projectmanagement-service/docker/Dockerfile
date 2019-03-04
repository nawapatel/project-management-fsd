FROM openjdk:8
EXPOSE 8085
ADD projectmanagement-service-0.0.1-SNAPSHOT.jar projectmanagement-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "projectmanagement-service-0.0.1-SNAPSHOT.jar"]
RUN sh -c 'touch /projectmanagement-service-0.0.1-SNAPSHOT.jar'
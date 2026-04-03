FROM openjdk:17-jdk-slim

COPY target/*.jar app.jar

EXPOSE 8084

ENTRYPOINT ["java", "-java", "/app.jar"]
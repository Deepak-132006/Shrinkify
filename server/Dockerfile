FROM openjdk:17-jdk-slim

COPY server/target/*.jar app.jar

EXPOSE 8084

ENTRYPOINT ["java", "-java", "/app.jar"]
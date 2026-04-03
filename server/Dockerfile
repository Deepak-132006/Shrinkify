FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY server/target/*.jar app.jar

EXPOSE 8084

ENTRYPOINT ["java", "-jar", "app.jar"]
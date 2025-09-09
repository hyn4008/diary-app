# 1단계: 빌드
FROM gradle:7.6-jdk17 AS build

WORKDIR /app

COPY build.gradle settings.gradle ./
COPY src ./src

RUN gradle bootJar --no-daemon

# 2단계: 실행용 이미지
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
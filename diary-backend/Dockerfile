# OpenJDK 17을 기반으로 하는 슬림 이미지 사용
FROM openjdk:17-jdk-slim

# 작업 디렉터리 설정
WORKDIR /app

# 빌드된 JAR 파일을 이미지 안으로 복사
COPY build/libs/app.jar app.jar

# 컨테이너가 실행될 때 JAR 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
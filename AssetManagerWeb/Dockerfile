# JAVA BASE
FROM openjdk:8-jdk-alpine

# MAINTAINER
LABEL maintainer="santhoshkumar.mail@gmail.com"

# ARTIFACT
ARG JAR_FILE=target/AssetManagerWeb-1.0.jar

# COPY ARTIFACT
COPY ${JAR_FILE} asset-manager-web-1.0.jar

# RUN
ENTRYPOINT ["java","-jar","/asset-manager-web-1.0.jar"]

FROM openjdk:18 as build

RUN mkdir -p /usr/app/

WORKDIR /usr/app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN sh mvnw install -DskipTests

FROM openjdk:18
RUN mkdir -p /usr/app/
WORKDIR /usr/app
COPY --from=build /usr/app/target/rps-101-0.0.1-SNAPSHOT.jar /usr/app
EXPOSE 8081
CMD ["java", "-jar", "rps-101-0.0.1-SNAPSHOT.jar"]
# Estágio 1: Build
# Usamos o Maven com Java 17 para compilar o código
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
# Copia o pom.xml e as bibliotecas primeiro (ajuda no cache do Docker)
COPY pom.xml .
RUN mvn dependency:go-offline
# Copia o código fonte e gera o .jar
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio 2: Run
# Usamos uma imagem leve apenas com o JRE 17 para rodar
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
# O seu projeto gera um arquivo chamado ProjetoSpringAngular-0.0.1-SNAPSHOT.jar
# O comando abaixo pega esse arquivo e o renomeia para app.jar para facilitar
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
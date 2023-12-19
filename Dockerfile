FROM node:latest as build-stage
ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_SU_NAME
ARG DATABASE_SU_USER
ARG DATABASE_SU_PASSWORD
ARG DATABASE_RL_NAME
ARG DATABASE_RL_USER
ARG DATABASE_RL_PASSWORD
ARG KAFKA_CLIENT_ID
ARG KAFKA_BROKER
ARG APPLICATION_PORT
ARG ROBOT_PORT
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
FROM node:latest as production-stage
COPY --from=build-stage /app/build /app
COPY --from=build-stage /app/node_modules /node_modules
EXPOSE 8077
ENTRYPOINT [ "node","/app/app.js" ]
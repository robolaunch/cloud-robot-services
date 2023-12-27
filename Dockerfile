FROM node:latest as build-stage
COPY . /app
WORKDIR /app
RUN npm install
RUN npm i -g @vercel/ncc
RUN ncc build app/app.ts -o build
FROM node:latest as production-stage
COPY --from=build-stage /app/build /app
EXPOSE 8077
ENTRYPOINT [ "node","/app/index.js" ]
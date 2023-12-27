FROM node:20.10-alpine3.18 as build-stage
COPY . /app
WORKDIR /app
RUN npm install
RUN npm i -g @vercel/ncc
RUN ncc build app/app.ts -o build
FROM node:20.10-alpine3.18 as production-stage
COPY --from=build-stage /app/build /app
EXPOSE 8077
ENTRYPOINT [ "node","/app/index.js" ]
# build front end
FROM node:14-alpine as client_build

WORKDIR /app

COPY ./client /app/

RUN npm install
RUN node_modules/.bin/ng build --configuration production

# build back end
FROM node:14-alpine as server_build

WORKDIR /app

COPY ./server /app/
COPY --from=client_build /app/dist/file-manager-app /app/dist/file-manager-app

RUN npm install --production

# build docker
FROM alpine

WORKDIR /app

RUN apk add --no-cache nodejs

COPY --from=server_build /app ./

EXPOSE 3006

CMD ["node", "index"]
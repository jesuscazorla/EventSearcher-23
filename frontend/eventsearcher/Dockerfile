# Stage 1 - Build
FROM node:16 AS build
WORKDIR /usr/app
COPY ./package.json .
COPY ./package-lock.json .
COPY ./angular.json .
RUN npm ci
RUN npx ngcc
COPY . .
RUN npm run build --prod

# Stage 2 - Run
FROM nginx:alpine AS run
COPY --from=build /usr/app/dist/eventsearcher/ /usr/share/nginx/html
EXPOSE 80

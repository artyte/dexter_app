FROM node:13.12.0-alpine as frontend
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM nginx:stable-alpine as webserver
COPY --from=frontend /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
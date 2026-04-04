# Build stage
FROM node:20.19.6-alpine AS build
# /app

# cd app
WORKDIR /app


COPY package.json package-lock.json ./
RUN npm ci


COPY . .
RUN npm run build

# Runtime stage
FROM nginx:1.17-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
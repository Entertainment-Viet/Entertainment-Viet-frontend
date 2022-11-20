# build stage
FROM node:16-alpine as build-stage
RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build

EXPOSE 3000
CMD [ "npx", "serve", "build" ]

# production stage
FROM nginx:1.22.0-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
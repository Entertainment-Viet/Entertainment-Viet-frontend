RUN apk update \
    && apk add --no-cache openssh-server openrc git rsync \
    && mkdir -p /run/openrc \
    && touch /run/openrc/softlevel \
    && mkdir /repos /repos-backup \
    && sed -ie "s/#PubkeyAuthentication/PubkeyAuthentication/g" /etc/ssh/sshd_config \
    && sed -ie "s/#PasswordAuthentication yes/PasswordAuthentication no/g" /etc/ssh/sshd_config \
    && echo "0 5 * * * cd /repos ;for i in $(ls); do echo -n '$i : ' ;git -C $i pull 2>/dev/null ;done" > /etc/crontabs/root \
    && echo "30 5 * * * rsync -qr /repos/* /repos-backup" > /etc/crontabs/root

ENTRYPOINT ["sh","-c", "rc-status; rc-service sshd start; crond -f"]
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
CMD ["nginx", "-g", "daemon off;"]
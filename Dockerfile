# build stage
FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build

ENV REACT_APP_API = 'https://boiling-shore-81192.herokuapp.com'
ENV REACT_APP_MOCK_API = 'https://9defeddd-9d2c-44c8-b942-b1bed205bd71.mock.pstmn.io'
ENV REACT_APP_ENV = 'development'
ENV REACT_KEYCLOAK_API = 'https://shielded-escarpment-36770.herokuapp.com'
EXPOSE 3000
CMD [ "npx", "serve", "build" ]

# production stage
# FROM nginx:1.22.0-alpine as production-stage
# COPY --from=build-stage /app/build /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]
# Stage 1 - the build process
FROM node:10.16 as build-stage
ENV HOME /etc/app
ADD . $HOME/
WORKDIR $HOME
RUN yarn && yarn build

# Stage 2 - the production environment
FROM nginx:latest
ENV HOME=/usr/share/nginx/html/feelthemovies
COPY --from=build-stage /etc/app/build $HOME
COPY nginx.conf /etc/nginx/nginx.conf
VOLUME ["/etc/uploads"]
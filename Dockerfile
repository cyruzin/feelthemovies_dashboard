FROM node:10.16.0-slim as build-stage
ENV HOME /etc/app
ADD . $HOME/
WORKDIR $HOME
RUN yarn && yarn build

FROM nginx:latest

ENV HOME=/usr/share/nginx/html/feelthemovies

COPY --from=build-stage /etc/app/build $HOME
COPY nginx.conf /etc/nginx/nginx.conf

VOLUME ["/etc/uploads"]
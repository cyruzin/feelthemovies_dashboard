FROM node:9.11.2-slim as build-stage
ENV HOME /etc/app
ADD . $HOME/
WORKDIR $HOME
RUN yarn && yarn build

FROM nginx:latest

ENV HOME=/usr/share/nginx/html/feelthemovies

COPY --from=build-stage /etc/app/dist $HOME
COPY nginx.conf /etc/nginx/nginx.conf

VOLUME ["/etc/uploads"]
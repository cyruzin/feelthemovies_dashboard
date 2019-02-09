# Node
FROM node:10.15.1-alpine
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# NGINX
FROM nginx:1.15.8-alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD [“nginx”, “-g”, “daemon off;”]
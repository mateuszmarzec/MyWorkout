FROM nginx:1.21.4-alpine as local

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.local.conf /etc/nginx/conf.d/nginx.conf


FROM nginx:1.21.4-alpine as production

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.prod.conf /etc/nginx/conf.d/nginx.conf

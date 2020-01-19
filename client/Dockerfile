FROM nginx:1.17.6-alpine
COPY ./build /var/www
# COPY ./ssl_cert /etc/nginx/ssl_cert
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
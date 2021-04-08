# PHP 8.0 and Nginx
Based from [romeoz/docker-phpfpm:7.3](https://github.com/romeOz/docker-nginx-php/tree/master/7.3) and [khromov/alpine-nginx-php8](https://github.com/khromov/alpine-nginx-php8)

## Build Image

```bash
docker build -t nginx_php:8.0 .
```

## Build Container

Run this command in your web folder

```bash
docker run -d -i -p 80:80 -v ${PWD}:/var/www/html/ --net db_network --name http_php80 nginx_php:8.0
```

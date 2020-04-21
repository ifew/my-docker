# PHP 7.3 and Nginx
Based from [romeoz/docker-phpfpm:7.3](https://github.com/romeOz/docker-nginx-php/tree/master/7.3)

## Build Image

```bash
docker build -t nginx_php:7.3 .
```

## Build Container

Run this command in your web folder

```bash
docker run -d -i -p 80:80 -v ${PWD}:/var/www/app/ --net db_network --name http_php73 nginx_php:7.3
```

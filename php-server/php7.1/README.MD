# PHP 7.1 and Nginx
Based from [romeoz/docker-phpfpm:7.1](https://github.com/romeOz/docker-nginx-php/tree/master/7.1)

## Build Image

```bash
docker build -t nginx_php:7.1 .
```

## Build Container

```bash
docker run -d -i -p 80:80 -v ${PWD}:/var/www/app/ --net db_network --name http_php71 nginx_php:7.1
```
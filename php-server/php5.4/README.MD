# PHP 5.4 and Nginx
Based from [romeoz/docker-phpfpm:5.4](https://github.com/romeOz/docker-nginx-php/tree/master/5.4)

## Build Image

```bash
docker build --platform=linux/i386 -t nginx_php:5.4 .
```

## Build Container

```bash
docker run -d -i -p 80:80 -v ${PWD}:/var/www/app/ --net db_network --name http_php54 nginx_php:5.4
```
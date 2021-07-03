# PHP 5.6 and Nginx
Based from [romeoz/docker-phpfpm:5.6](https://github.com/romeOz/docker-nginx-php/tree/master/5.6)

## Build Image

```bash
docker build -t nginx_php:5.6 .
```

## Build Container

```bash
docker run -d -i -p 80:80 -v ${PWD}:/var/www/app/ --net db_network --name http_php56 nginx_php:5.6
```
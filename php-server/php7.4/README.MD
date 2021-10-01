# PHP 7.3 and Nginx
Based from [romeoz/docker-phpfpm:7.3](https://github.com/romeOz/docker-nginx-php/tree/master/7.3) and [GaryClarke/nginx-php7.4-mysql8-node-docker-network](https://github.com/GaryClarke/nginx-php7.4-mysql8-node-docker-network)

## Build Image

```bash
docker build -t nginx_php:7.4 .
```

## Build Container

Run this command in your web folder

```bash
docker run -d -i -p 80:80 -v ${PWD}:/var/www/app/ --net db_network --name http_php74 nginx_php:7.4
```

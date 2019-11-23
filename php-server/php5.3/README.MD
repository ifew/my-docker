# PHP 5.3 and Nginx
Based from [romeoz/docker-phpfpm:5.3](https://github.com/romeOz/docker-nginx-php/tree/master/5.3)

## Build Image

```bash
docker build -t nginx_php:5.3 .
```

## Build Container

```bash
docker run -d -i -p 80:80 -v ${PWD}:/var/www/app/ --net db_network --name http_php53 nginx_php:5.3
```
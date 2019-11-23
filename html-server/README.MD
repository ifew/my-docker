# Nginx Server for HTML, JS, CSS

## Nginx Server for temporary testing HTML, JS, CSS
```bash
docker run -d -v $(pwd):/usr/share/nginx/html --name=html_server -p 80:80 nginx
```


## Nginx Server for testing HTML, JS, CSS
```bash
docker run -d -v $(pwd):/var/www --name=html_server -p 80:80 nginx
```
# Create Container by command
1. Change mapping directory "D:/Docker/db_mysql"
2. Change root password "MYSQL_ROOT_PASSWORD=1234"

```
docker network create db_network
```

## MySQL latest
```
docker run --name db_mysql -v /Users/ifew/Database/db_mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234 -d -p 3306:3306 --net db_network mysql --default-authentication-plugin=mysql_native_password --skip-mysqlx
```

## MySQL 5
```
docker run --name db_mysql5 -v /Users/ifew/Database/db_mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234 -d -p 3306:3306 --net db_network mysql:5.7
```

## MySQL 5, For Apple M1
Must added this argument
```
docker run --platform linux/x86_64 ...
```

or

```
docker run --platform=linux/amd64 ...
```

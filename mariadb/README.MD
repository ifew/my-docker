# Create Container by command
1. Change mapping directory "D:/Docker/db_mariadb"
2. Change root password "MYSQL_ROOT_PASSWORD=1234"

```
docker network create db_network
```

## MariaDB latest
```
docker run --name db_mariadb -v D:/Docker/db_mariadb:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234 -d -p 3306:3306 --net db_network mariadb --default-authentication-plugin=mysql_native_password --skip-mysqlx
```

## MySQL 10.1.47
```
docker run --name db_mariadb101 -v D:/Docker/db_mariadb101:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234 -d -p 3306:3306 --net db_network mariadb:10.1.47
```
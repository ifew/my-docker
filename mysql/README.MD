# Create Container by command
1. Change mapping directory "D:/Docker/db_mysql"
2. Change root password "MYSQL_ROOT_PASSWORD=1234"

```
docker run --name db_mysql -v D:/Docker/db_mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234 -d -p 3306:3306 mysql --default-authentication-plugin=mysql_native_password --skip-mysqlx
```

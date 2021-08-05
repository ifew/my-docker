# FROM romeoz/docker-phpfpm:5.3
# MAINTAINER romeOz <serggalka@gmail.com>

# ENV OS_LOCALE="en_US.UTF-8"
# RUN ln -sf /usr/share/zoneinfo/Asia/Bangkok /etc/localtime
# RUN locale-gen ${OS_LOCALE}
# ENV LANG=${OS_LOCALE} \
#     LANGUAGE=${OS_LOCALE} \
#     LC_ALL=${OS_LOCALE} \
# 	NGINX_CONF_DIR=/etc/nginx

# COPY ./supervisord.conf /etc/supervisor/conf.d/
# COPY ./app /var/www/app/

# RUN	\
# 	BUILD_DEPS='software-properties-common python-software-properties wget' \
# 	&& apt-get update \
# 	&& apt-get install --no-install-recommends -y $BUILD_DEPS \
#     && wget -O - http://nginx.org/keys/nginx_signing.key | apt-key add - \
# 	&& echo "deb http://nginx.org/packages/ubuntu/ precise nginx" | tee -a /etc/apt/sources.list \
# 	&& echo "deb-src http://nginx.org/packages/ubuntu/ precise nginx" | tee -a /etc/apt/sources.list \
# 	&& apt-get update \
# 	&& apt-get install -y vim wget nginx \
# 	&& rm -rf  ${NGINX_CONF_DIR}/sites-enabled/* ${NGINX_CONF_DIR}/sites-available/* \
# 	# Install supervisor
# 	&& apt-get install -y supervisor && mkdir -p /var/log/supervisor \
# 	&& chown www-data:www-data /var/www/app/ -Rf \
# 	# Cleaning
# 	&& apt-get purge -y --auto-remove $BUILD_DEPS \
# 	&& apt-get autoremove -y && apt-get clean \
# 	&& rm -rf /var/lib/apt/lists/* \
# 	# Forward request and error logs to docker log collector
# 	&& ln -sf /dev/stdout /var/log/nginx/access.log \
# 	&& ln -sf /dev/stderr /var/log/nginx/error.log

# COPY ./configs/nginx.conf ${NGINX_CONF_DIR}/nginx.conf
# COPY ./configs/default.conf ${NGINX_CONF_DIR}/conf.d/default.conf
# COPY ./configs/app.conf ${NGINX_CONF_DIR}/sites-enabled/app.conf
# COPY ./configs/www.conf /etc/php5/fpm/pool.d/www.conf

# WORKDIR /var/www/app/

# EXPOSE 80 443

# CMD ["/usr/bin/supervisord"]

FROM ubuntu:16.04
 
RUN apt-get update
RUN apt-get -y install apt-utils locales nginx wget vim libkeyutils1
 
# Set the locale
ENV OS_LOCALE="en_US.UTF-8"
RUN locale-gen ${OS_LOCALE}
ENV LANG ${OS_LOCALE}
ENV LANGUAGE ${OS_LOCALE}
ENV LC_ALL ${OS_LOCALE}
ENV NGINX_CONF_DIR=/etc/nginx
RUN ln -sf /usr/share/zoneinfo/Asia/Bangkok /etc/localtime


RUN apt-get install -y m4 make gcc bison flex patch subversion locate libevent-dev libxml2-dev libssl-dev libcurl4-openssl-dev libjpeg-dev libpng-dev libmcrypt-dev libmysqlclient-dev snmpd

RUN wget http://ftp.gnu.org/gnu/autoconf/autoconf-2.59.tar.gz
RUN tar zxf autoconf-2.59.tar.gz
RUN cd autoconf-2.59 && ./configure  && make && make install

RUN cd /tmp
RUN wget "https://www.openssl.org/source/old/1.0.1/openssl-1.0.1t.tar.gz"
RUN tar xzf openssl-1.0.1t.tar.gz
RUN cd openssl-1.0.1t \
	&& ./config shared --prefix=/opt/openssl \
	&& make -j $(nproc) && make install
RUN ln -s /opt/openssl/lib /opt/openssl/lib/x86_64-linux-gnu
RUN echo "/opt/openssl/lib" > /etc/ld.so.conf.d/openssl.conf
RUN ldconfig

RUN apt-get install -y libcurl4-openssl-dev pkg-config libxslt-dev

RUN wget https://www.php.net/distributions/php-5.3.29.tar.gz
RUN tar -xvf php-5.3.29.tar.gz
RUN cd php-5.3.29 && chmod +x buildconf && rm configure && sh buildconf --force \
	&& ./configure --prefix=/opt/php-5.3.29 --enable-fpm -with-fpm-user=www-data --with-fpm-group=www-data --sysconfdir=/etc/php5/conf.d --with-config-file-path=/etc/php5/conf.d/php.ini --with-zlib --with-openssl --enable-zip --enable-exif --enable-ftp --enable-mbstring --enable-mbregex --enable-soap --enable-sockets --disable-cgi --with-curl --with-curlwrappers --with-gd --with-mcrypt --enable-memcache --with-mhash --with-jpeg-dir=/usr/local/lib --with-mysql --enable-pdo --with-pdo-mysql --with-pdo-sqlite --with-sqlite--with-xmlrpc --with-xsl\
	&& make && make test && make install

#install supervisor
RUN mkdir -p /var/log/supervisor 
RUN apt-get install -y supervisor 
COPY ./app /var/www/app/
RUN chown -Rf www-data:www-data /var/www/app/ 

# clean & foward log to stdout
RUN apt-get purge -y --auto-remove $BUILD_DEPS \
	&& apt-get autoremove -y && apt-get clean \
	&& rm -rf /var/lib/apt/lists/* \
	&& ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log \
	&& rm -rf  ${NGINX_CONF_DIR}/sites-enabled/* ${NGINX_CONF_DIR}/sites-available/*

COPY ./supervisord.conf /etc/supervisor/conf.d/
COPY ./app /var/www/app/

COPY ./configs/nginx.conf ${NGINX_CONF_DIR}/nginx.conf
COPY ./configs/default.conf ${NGINX_CONF_DIR}/conf.d/default.conf
COPY ./configs/app.conf ${NGINX_CONF_DIR}/sites-enabled/app.conf
COPY ./configs/www.conf /etc/php5/fpm/pool.d/www.conf

WORKDIR /var/www/app/
EXPOSE 80 443

CMD ["/usr/bin/supervisord"]
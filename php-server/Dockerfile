FROM ubuntu:18.04

#RUN apt-get update
#RUN apt-get dist-upgrade -y
#RUN apt-get upgrade -y
#RUN apt-get install wget vim curl nginx memcached php7.2-cli php7.2-fpm php7.2-dev php7.2-gd php7.2-mysql php7.2-memcached php7.2-curl php7.2-intl php7.2-mcrypt php7.2-memcache php7.2-xdebug php-apc -y

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#RUN adduser -S www-data -u 1000
RUN usermod -aG www-data www-data

# Setup Debian
RUN apt-get upgrade && apt-get update && ACCEPT_EULA=Y && apt-get install -y \
        unzip \
        libfreetype6-dev \
        libjpeg-turbo8-dev \
        libmcrypt-dev \
        libpng-dev \
        libmemcached-dev \
        libzip-dev \
        libgeoip-dev \
        libxml2-dev \
        libxslt-dev \
        libtidy-dev \
        libssl-dev \
        zlib1g-dev \
        libpng-dev \
        libjpeg-dev \
        libfreetype6-dev \
        libaio1 \
        apt-file \
        wget \
        vim \
        gnupg \
        gnupg2 \
        zip \
        git \
        gcc \
        musl-dev \
        make \
        g++ \
        curl \
        nginx \
        php-dev \
        php-fpm

# Install PECLs
RUN pecl install redis \
    && pecl install geoip-1.1.1 \
    && pecl install apcu \
    && pecl install memcached \
    && pecl install timezonedb \
    && pecl install grpc \
    && pecl install protobuf

RUN apt-get install -y php-calendar php-iconv php-bcmath php-xml php-gd php-mbstring php-pdo php-tidy php-gettext php-intl php-mysql php-mysqli php-simplexml php-tokenizer php-xml php-xsl php-xmlwriter php-zip php-opcache php-exif
    #&& docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-gd --with-jpeg-dir=/usr/include/ \
    #&& docker-php-ext-configure zip --with-libzip \
    #&& docker-php-ext-enable redis geoip apcu memcached timezonedb grpc

# Ensure that PHP FPM is run as root.
#RUN sed -i "s/user = www-data/user = root/" /etc/php/7.2/fpm/pool.d/www.conf
#RUN sed -i "s/group = www-data/group = root/" /etc/php/7.2/fpm/pool.d/www.conf

# Pass all docker environment
RUN sed -i '/^;clear_env = no/s/^;//' /etc/php/7.2/fpm/pool.d/www.conf

# Get access to FPM-ping page /ping
RUN sed -i '/^;ping\.path/s/^;//' /etc/php/7.2/fpm/pool.d/www.conf
# Get access to FPM_Status page /status
RUN sed -i '/^;pm\.status_path/s/^;//' /etc/php/7.2/fpm/pool.d/www.conf

# Prevent PHP Warning: 'xdebug' already loaded.
# XDebug loaded with the core
# RUN sed -i '/.*xdebug.so$/s/^/;/' /etc/php/7.2/mods-available/xdebug.ini

#RUN pecl install memcached redis grpc
#RUN php7.2enmod mcrypt memcached redis grpc

# Add configuration files
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/fastcgi_params /etc/nginx/
COPY nginx/default.conf /etc/nginx/conf.d/
COPY php/php.ini /etc/php/7.2/fpm/conf.d/40-custom.ini

# install GIT
#RUN apt-get install -my git

# Install modman
#RUN curl -SL https://raw.githubusercontent.com/colinmollenhour/modman/master/modman -o modman \
#    && chmod +x ./modman \
#    && mv ./modman /usr/local/bin/

# Add modman wrapper
#COPY docker/development/frontend/files/modman-wrapper.sh /modman-wrapper.sh

#RUN chmod +x /modman-wrapper.sh

# install PHPUnit
#RUN apt-get install -my phpunit

# Resolve conflict users mysql
# RUN sed -e 's/user.=.mysql/user=root/' -i /etc/mysql/my.cnf

################################################################################
# Application files
################################################################################
# COPY www /var/www

################################################################################
# Ports
################################################################################

EXPOSE 80 443 9000

ENV export GOOGLE_APPLICATION_CREDENTIALS=/var/www/test-google-speech-c0b1e7744540.json
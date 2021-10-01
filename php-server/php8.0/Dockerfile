FROM alpine:3.13.4
LABEL Maintainer="Stanislav Khromov <stanislav+github@khromov.se>" \
      Description="Lightweight container with Nginx 1.18 & PHP-FPM 8 based on Alpine Linux."

ARG PHP_VERSION="8.0.11-r0"

# Install packages and remove default server definition
RUN apk --no-cache add php8=${PHP_VERSION} \
    php8-ctype \
    php8-curl \
    php8-common \
    php8-dom \
    php8-exif \
    php8-fileinfo \
    php8-fpm \
    php8-gettext \
    php8-gd \
    php8-iconv \
    php8-intl \
    php8-mbstring \
    php8-mysqli \
    php8-opcache \
    php8-openssl \
    php8-pdo \
    php8-pdo_mysql \
    php8-pdo_pgsql \
    php8-pdo_sqlite \
    php8-pdo_odbc \
    php8-pecl-imagick \
    php8-pecl-redis \
    php8-phar \
    php8-pear \
    php8-session \
    php8-simplexml \
    php8-sqlite3 \
    php8-soap \
    php8-soap \
    php8-tokenizer \
    php8-xml \
    php8-xmlreader \
    php8-xmlwriter \
    php8-xsl \
    php8-zip \
    php8-zlib \
    nginx supervisor curl tzdata htop mysql-client 
    
RUN rm /etc/nginx/conf.d/default.conf

# Symlink php8 => php
RUN ln -s /usr/bin/php8 /usr/bin/php

# Install PHP tools
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && chmod +x wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# Configure nginx
COPY configs/nginx.conf /etc/nginx/nginx.conf
COPY configs/app.conf /etc/nginx/sites-enabled/app.conf

# Configure PHP-FPM
COPY configs/fpm-pool.conf /etc/php8/php-fpm.d/www.conf
COPY configs/php.ini /etc/php8/conf.d/custom.ini

# Configure supervisord
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Setup document root
RUN mkdir -p /var/www/html

# Make sure files/folders needed by the processes are accessable when they run under the nobody user
RUN chown -R nobody.nobody /var/www/html && \
  chown -R nobody.nobody /run && \
  chown -R nobody.nobody /var/lib/nginx && \
  chown -R nobody.nobody /var/log/nginx

# Switch to use a non-root user from here on
USER nobody

# Add application
WORKDIR /var/www/html
COPY --chown=nobody app/ /var/www/html/

# Expose the port nginx is reachable on
EXPOSE 80

# Let supervisord start nginx & php-fpm
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

# Configure a healthcheck to validate that everything is up&running
HEALTHCHECK --timeout=10s CMD curl --silent --fail http://127.0.0.1/fpm-ping

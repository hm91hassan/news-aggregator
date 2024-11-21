# Use official PHP image
FROM php:8.1-fpm

# Install required PHP extensions
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql

# Set working directory
WORKDIR /var/www/html

COPY .env.example .env

RUN echo 'php artisan key:generate'

# Copy the Laravel files into the container
COPY . .

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install dependencies via Composer
RUN composer install --no-scripts --no-autoloader


# Expose port 8000 to access the Laravel application
EXPOSE 8000

# Start PHP-FPM server
CMD ["php-fpm"]

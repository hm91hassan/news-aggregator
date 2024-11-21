#!/bin/bash

echo "Running Laravel setup script..."



# # Install dependencies
# composer install



# php artisan config:clear

# # Generate application key
# php artisan key:generate

# Run migrations
php artisan migrate:fresh

# Fetch initial data
php artisan fetch:newsapi
php artisan fetch:guardian-news
php artisan fetch:nytimes-news

# Start the Laravel development server
php artisan serve --host=0.0.0.0 --port=8000

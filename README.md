# News Aggregator

A Laravel and React-based application for aggregating news articles. This project consists of a backend built with Laravel and a frontend built with React.

---

## Installation Guide

Follow these steps to set up the project:

### Step 1: Clone the Repository

```bash

git clone https://github.com/hm91hassan/news-aggregator.git

```

### Step 2: Navigate to the Backend Directory

```bash
cd news-aggregator/news-aggregator-backend

```

### Step 3: Install Backend Dependencies

```bash
composer install
```

### tep 4: Copy the .env File

```bash
cp .env.example .env

```

### Step 5: Generate the Application Key

```bash
php artisan key:generate
```

### Step 6: Navigate to the Frontend Directory

```bash
cd ../news-aggregator-frontend/
```

### Step 7: Install Frontend Dependencies

```bash
npm install
```

### Step 8: Return to the Root Directory

```bash
cd ../
```

### Step 9: Build and Start Docker Containers

```bash
docker-compose up --build
```

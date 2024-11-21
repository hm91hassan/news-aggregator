# News Aggregator

A Laravel and React-based application for aggregating news articles. This project consists of a backend built with Laravel and a frontend built with React.

---

## **Table of Contents**

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Scheduler](#scheduler)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)

---

## **Features**

-   User authentication and registration (via Laravel Sanctum).
-   Fetch news from external sources and store them in a local database.
-   Filter news articles by source, author, and date.
-   Save user preferences for personalized news feeds.
-   Mobile-responsive design ready for frontend integration.
-   Secure API with CORS and rate limiting.

---

## **Tech Stack**

-   Backend: **Laravel 10**
-   Authentication: **Laravel Sanctum**
-   API Fetching: **Guzzle**
-   Database: **MySQL**
-   Containerization: **Docker**
-   Scheduling: **Laravel Task Scheduler**

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

## **Configuration**

### **Environment Variables**

Configure the following variables in your `.env` file:

| Variable        | Description                      | Example            |
| --------------- | -------------------------------- | ------------------ |
| `APP_NAME`      | Application name                 | `NewsAggregator`   |
| `APP_URL`       | Application URL                  | `http://localhost` |
| `DB_CONNECTION` | Database connection type         | `mysql`            |
| `DB_HOST`       | Database host                    | `127.0.0.1`        |
| `DB_PORT`       | Database port                    | `3306`             |
| `DB_DATABASE`   | Database name                    | `news_aggregator`  |
| `DB_USERNAME`   | Database username                | `root`             |
| `DB_PASSWORD`   | Database password                | `password`         |
| `NEWS_API_KEY`  | API key for external news source | `your-api-key`     |

---

## Access the Application

If you encounter any issues:

-   Frontend: http://localhost:3000
-   Backend API: http://localhost:8000

---

## Troubleshooting

If you encounter any issues:

-   Ensure Docker is installed and running.
-   Check the .env file in the backend directory for correct configuration.
-   Verify that ports 3000 and 8000 are available on your machine.

---

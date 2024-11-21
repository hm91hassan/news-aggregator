# **News Aggregator API**

A Laravel-based backend API for aggregating news articles from multiple sources, providing user authentication, personalized news feeds, and user preference management.

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

## **Installation**

### **Prerequisites**

-   PHP 8.1+
-   Composer
-   Docker & Docker Compose
-   MySQL (optional, if not using Docker)

### **Setup**

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/news-aggregator-backend.git
    cd news-aggregator-backend
    ```

2. Install dependencies:

    ```bash
    composer install
    ```

3. Set up the environment:

    ```bash
    cp .env.example .env
    ```

4. Generate the application key:

    ```bash
    php artisan key:generate
    ```

5. Build and run Docker containers:

    ```bash
    docker-compose up -d
    ```

6. Run database migrations and seeders:
    ```bash
    php artisan migrate
    ```

---

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

## **Usage**

### **Start the Application**

1. Start the Docker containers:
    ```bash
    docker-compose up -d
    ```
2. Access the application at:
    - **API**: `http://localhost:8000`
    - **MySQL**: `localhost:3306` (Docker-based)

### **Fetch News**

Manually fetch news from external sources:

```bash
php artisan news:fetch
```

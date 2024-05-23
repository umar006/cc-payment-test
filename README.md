# Coding Collective Payment Test

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- Docker Compose

## Setup and Usage

### Step 1: Clone the Repository

```sh
git clone git@github.com:umar006/cc-payment-test.git
cd cc-payment-test
```

### Step 2: Build and Run the Containers

```sh
docker-compose up --build
```

### Step 3: Access the Services

- **Client Application:** Open your browser and navigate to `http://localhost`.
- **Server Application:** The server runs on `http://localhost:3000`.
- **Database:** The PostgreSQL database is accessible on `localhost:5432`.

## Notes

- Ensure the `.env` file exists in the `./server` directory and contains the necessary environment variables for the server application.
- The `./server/src/database/migrations` directory should contain the initial database migration scripts for PostgreSQL.

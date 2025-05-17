# Deployment Guide

This document provides instructions for deploying the InfraBit Portfolio application in different environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Environment Variables](#environment-variables)

## Prerequisites

- Node.js v16 or later
- npm v8 or later
- MongoDB (local or Atlas)
- Git

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/infrabit-portfolio.git
   cd infrabit-portfolio
   ```

2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Set up environment variables:
   ```bash
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   ```
   
   Then edit the `.env` files with your configuration.

4. Start the development servers:
   ```bash
   npm start
   ```

## Docker Deployment

1. Make sure Docker and Docker Compose are installed on your system.

2. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/infrabit-portfolio.git
   cd infrabit-portfolio
   ```

3. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

4. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

5. To stop the containers:
   ```bash
   docker-compose down
   ```

## Production Deployment

### Option 1: Traditional Hosting

1. Build the client and server:
   ```bash
   npm run build
   ```

2. Deploy the server:
   - Copy the `server/dist` directory to your server
   - Install production dependencies: `cd server && npm ci --production`
   - Set up environment variables in production
   - Start the server: `NODE_ENV=production node dist/index.js`

3. Deploy the client:
   - Upload the contents of `client/dist` to your web server
   - Configure your web server to serve the static files
   - For SPAs, set up URL rewriting to redirect all requests to index.html

### Option 2: Docker in Production

1. Build the Docker images:
   ```bash
   docker-compose build
   ```

2. Push the images to a container registry (Docker Hub, ECR, etc.)

3. On your production server, pull the images and run:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

## Environment Variables

### Client

| Variable      | Description           | Default                   |
|---------------|-----------------------|---------------------------|
| VITE_API_URL  | URL to the backend API| http://localhost:5000/api |

### Server

| Variable       | Description                | Example                        |
|----------------|----------------------------|--------------------------------|
| PORT           | Server port                | 5000                           |
| MONGODB_URI    | MongoDB connection string  | mongodb://localhost:27017/infrabit |
| NODE_ENV       | Environment                | development/production         |
| JWT_SECRET     | Secret for JWT tokens      | your_secure_jwt_secret_key     |
| CLIENT_URL     | URL to the frontend        | http://localhost:5173          |
| ADMIN_EMAIL    | Default admin email        | admin@yourdomain.com           |
| ADMIN_PASSWORD | Default admin password     | your_secure_password           |
| EMAIL_HOST     | SMTP server                | smtp.example.com               |
| EMAIL_PORT     | SMTP port                  | 587                            |
| EMAIL_SECURE   | Use TLS                    | false                          |
| EMAIL_USER     | SMTP username              | your_email@example.com         |
| EMAIL_PASSWORD | SMTP password              | your_email_password            |
| EMAIL_FROM     | Sender email address       | noreply@yourdomain.com         |
| EMAIL_TO       | Admin notification email   | admin@yourdomain.com           |

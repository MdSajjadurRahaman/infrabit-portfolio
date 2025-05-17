#!/bin/bash

# Setup script for InfraBit Portfolio demo
# This script will set up the application with demo data

# Text formatting
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BOLD}InfraBit Portfolio Demo Setup${NC}"
echo "This script will set up a demo version of the InfraBit Portfolio application"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null || ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: Docker and Docker Compose are required but not installed.${NC}"
    echo "Please install Docker Desktop from https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Create demo environment files
echo -e "${GREEN}Creating demo environment files...${NC}"

# Client .env
cat > ./client/.env << EOL
VITE_API_URL=http://localhost:5001/api
EOL

# Server .env
cat > ./server/.env << EOL
PORT=5001
MONGODB_URI=mongodb://mongo:27017/infrabit
NODE_ENV=development

# JWT Authentication
JWT_SECRET=demo_jwt_secret_not_for_production
CLIENT_URL=http://localhost:3000

# Admin User
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=demo123

# Demo email configuration (not actually sending emails)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=demo
EMAIL_PASSWORD=demo
EMAIL_FROM=demo@example.com
EMAIL_TO=admin@example.com
EOL

echo -e "${GREEN}Environment files created successfully${NC}"

# Start the application with Docker Compose
echo -e "${YELLOW}Starting the application with Docker Compose...${NC}"
echo "This might take a few minutes for the first run"

docker-compose up -d

# Wait for services to be ready
echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 10

# Seed the database with demo data
echo -e "${GREEN}Seeding the database with demo data...${NC}"
docker-compose exec server npm run seed

# Create a demo admin user
echo -e "${GREEN}Creating demo admin user...${NC}"
docker-compose exec server npm run seed:admin

echo ""
echo -e "${BOLD}Demo Setup Complete!${NC}"
echo -e "Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "Backend API: ${GREEN}http://localhost:5001${NC}"
echo -e "Admin Login: ${GREEN}http://localhost:3000/admin${NC}"
echo -e "Username: ${YELLOW}admin@example.com${NC}"
echo -e "Password: ${YELLOW}demo123${NC}"
echo ""
echo -e "${YELLOW}Note:${NC} This is a demo setup. Do NOT use in production!"
echo -e "To stop the demo: ${GREEN}docker-compose down${NC}"

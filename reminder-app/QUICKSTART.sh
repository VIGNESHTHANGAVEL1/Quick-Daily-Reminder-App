#!/bin/bash

# Daily Reminder App - Quick Start Script
# This script helps you set up and run the entire application

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     Daily Reminder App - Quick Start                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -e "${BLUE}[*] Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}[!] Node.js is not installed. Please install Node.js 14+ first.${NC}"
    exit 1
fi
echo -e "${GREEN}[✓] Node.js found: $(node --version)${NC}"

# Check if MongoDB is running
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}[!] MongoDB is not installed. Please install MongoDB first.${NC}"
    echo -e "${YELLOW}    https://www.mongodb.com/try/download/community${NC}"
    exit 1
fi
echo -e "${GREEN}[✓] MongoDB found${NC}"
echo ""

# Setup Backend
echo -e "${BLUE}[*] Setting up Backend...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi
echo -e "${GREEN}[✓] Backend ready${NC}"
echo ""

# Setup Web
echo -e "${BLUE}[*] Setting up Web App...${NC}"
cd ../web
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi
echo -e "${GREEN}[✓] Web app ready${NC}"
echo ""

# Setup Mobile
echo -e "${BLUE}[*] Setting up Mobile App...${NC}"
cd ../mobile
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi
echo -e "${GREEN}[✓] Mobile app ready${NC}"
echo ""

cd ..

# Display instructions
echo "╔════════════════════════════════════════════════════════════╗"
echo "║     Setup Complete! Next Steps:                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${YELLOW}1. Start MongoDB (in a terminal):${NC}"
echo "   mongod"
echo ""
echo -e "${YELLOW}2. Start Backend (in a new terminal):${NC}"
echo "   cd backend && npm start"
echo "   👉 Server will run on http://localhost:5000"
echo ""
echo -e "${YELLOW}3. Start Web App (in a new terminal):${NC}"
echo "   cd web && npm run dev"
echo "   👉 App will run on http://localhost:5173"
echo ""
echo -e "${YELLOW}4. Start Mobile App (in a new terminal):${NC}"
echo "   cd mobile && npm run android"
echo "   OR"
echo "   cd mobile && npm run ios"
echo ""
echo -e "${GREEN}📚 Documentation:${NC}"
echo "   - Main README: ./README.md"
echo "   - Implementation Guide: ./IMPLEMENTATION_GUIDE.md"
echo "   - Task Tracking: ./TASK_TRACKING.md"
echo "   - API Documentation: ./API_DOCUMENTATION.yaml"
echo "   - Postman Collection: ./POSTMAN_COLLECTION.json"
echo ""
echo -e "${GREEN}🧪 Testing:${NC}"
echo "   - Import POSTMAN_COLLECTION.json into Postman"
echo "   - Create test reminders"
echo "   - Check notifications in all apps"
echo ""

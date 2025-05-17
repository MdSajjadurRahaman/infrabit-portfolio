# InfraBit Company Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/MdSajjadurRahaman/infrabit-portfolio/actions/workflows/node.js.yml/badge.svg)](https://github.com/MdSajjadurRahaman/infrabit-portfolio/actions/workflows/node.js.yml)
[![GitHub issues](https://img.shields.io/github/issues/MdSajjadurRahaman/infrabit-portfolio)](https://github.com/MdSajjadurRahaman/infrabit-portfolio/issues)

This is a full stack web application for InfraBit, a company specializing in infrastructure solutions. The application showcases the company's services, projects, team members, testimonials, and provides a contact form for inquiries.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Project Structure

The project is organized into two main directories:

- `client`: React frontend built with Vite, TypeScript, and Tailwind CSS
- `server`: Node.js/Express backend with MongoDB integration

## Features

- Responsive design with Tailwind CSS
- Modern UI with smooth animations and transitions
- Projects showcase with filtering capabilities
- Team members section
- Services overview
- Testimonials carousel
- Contact form with validation and email notifications
- Backend API for data management
- Admin panel for content management
  - Secure authentication system
  - CRUD operations for all content
  - Password reset functionality
- Error handling and fallback mechanisms

## Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- Vite for fast development and optimized builds

### Backend
- Node.js
- Express.js
- MongoDB for database
- Mongoose for object modeling
- Nodemailer for sending emails
- Express validator for input validation
- CORS for handling cross-origin requests

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/MdSajjadurRahaman/infrabit-portfolio.git
   cd infrabit-portfolio
   ```

2. Install dependencies for both client and server
   ```bash
   npm run install-all
   ```

3. Create environment files
   ```bash
   # In the client directory
   cp client/.env.example client/.env
   
   # In the server directory
   cp server/.env.example server/.env
   ```

4. Configure environment variables
   - Update the MongoDB connection string in `server/.env`
   - Set a secure JWT_SECRET for authentication
   - Configure admin user credentials
   - Configure email settings for contact form and password reset functionality
   - Set the API URL in `client/.env`

5. Run the development server
   ```bash
   npm start
   ```
   
   This will start both the client and server in development mode.

### Quick Start with Docker

If you prefer using Docker, we provide a quick setup script that creates a demo environment:

```bash
# Clone the repository
git clone https://github.com/MdSajjadurRahaman/infrabit-portfolio.git
cd infrabit-portfolio

# Run the demo setup script
./demo-setup.sh
```

This script will:
1. Create demo environment files
2. Start the application with Docker Compose
3. Seed the database with sample data
4. Create a demo admin user

After running, you can access:
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin (username: admin@example.com, password: demo123)

### Building for Production

```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

For guidance on securely configuring the application, please see the [Security Configuration Guide](SECURITY_CONFIGURATION.md).

## Open Source

This project is open source and welcomes community contributions. For more details on our open source approach and how to get involved, please see the [Open Source Guide](OPEN_SOURCE.md).

## License

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd InfraBit.io
```

2. Install dependencies for both client and server
```bash
npm run install-all
```

3. Set up environment variables

**For the server (.env file in /server directory):**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
CONTACT_FORM_RECIPIENT=recipient@example.com
```

**For the client (.env file in /client directory):**
```
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

To run both the client and server concurrently:
```bash
npm start
```

To run only the client:
```bash
npm run client
```

To run only the server:
```bash
npm run server
```

The client will be available at `http://localhost:5173` and the server at `http://localhost:5000`.

## Deployment

### Building for Production

To build both client and server for production:
```bash
npm run build
```

### Deploying to a Server

1. **Frontend Deployment**
   - Build the React client: `cd client && npm run build`
   - Deploy the contents of the `client/dist` folder to your web server or static file hosting service (like Netlify, Vercel, or AWS S3)

2. **Backend Deployment**
   - Deploy the server directory to a Node.js hosting platform like Heroku, DigitalOcean, AWS Elastic Beanstalk, or a VPS
   - Ensure all environment variables are properly configured in your production environment
   - For services like Heroku, you can use the Procfile: `web: node server/dist/index.js`

3. **Database Setup**
   - Use MongoDB Atlas for a managed MongoDB instance in production
   - Configure your production backend to connect to this database

### Deployment Options
- **Heroku**: Deploy both frontend and backend to Heroku
- **Vercel/Netlify + Heroku**: Deploy frontend to Vercel/Netlify and backend to Heroku
- **AWS**: Use AWS Amplify for frontend and Elastic Beanstalk for backend
- **DigitalOcean**: Deploy both frontend and backend to a DigitalOcean droplet with Nginx

## Project Structure Details

### Client Structure
```
client/
├── public/            # Public assets
├── src/
│   ├── assets/        # Images, fonts, etc.
│   ├── components/    # React components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── services/      # API and service functions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main App component
│   └── main.tsx       # Entry point
├── .env.example       # Example environment variables
└── package.json       # Dependencies and scripts
```

### Server Structure
```
server/
├── src/
│   ├── controllers/   # Request handlers
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── utils/         # Utility functions
│   └── index.ts       # Entry point
├── .env.example       # Example environment variables
└── package.json       # Dependencies and scripts
```

## API Endpoints

The backend exposes the following API endpoints:

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get a specific service
- `POST /api/services` - Create a new service
- `PUT /api/services/:id` - Update a service
- `DELETE /api/services/:id` - Delete a service

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Team
- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get a specific team member
- `POST /api/team` - Create a team member
- `PUT /api/team/:id` - Update a team member
- `DELETE /api/team/:id` - Delete a team member

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/featured` - Get featured testimonials
- `GET /api/testimonials/:id` - Get a specific testimonial
- `POST /api/testimonials` - Create a testimonial
- `PUT /api/testimonials/:id` - Update a testimonial
- `DELETE /api/testimonials/:id` - Delete a testimonial

### Contact
- `POST /api/contact` - Submit contact form

## License

[MIT License](LICENSE)

## Contributors

- [Your Name](https://github.com/yourusername)

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Backend
- Node.js with Express
- TypeScript
- MongoDB for database
- Mongoose ODM
- REST API architecture

## Getting Started

### Prerequisites
- Node.js 14+ and npm
- MongoDB (local or cloud instance)

### Installation and Setup

1. Clone the repository
   ```
   git clone https://github.com/your-username/infrabit-portfolio.git
   cd infrabit-portfolio
   ```

2. Install dependencies for both frontend and backend
   ```
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Configure environment variables
   - Create `.env` file in the server directory based on `.env.example`
   - Create `.env` file in the client directory based on `.env.example`

4. Start the development servers
   ```
   # Start the backend server
   cd server
   npm run dev
   
   # In another terminal, start the frontend
   cd client
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application

## Production Deployment

### Frontend Build
```
cd client
npm run build
```

### Backend Build
```
cd server
npm run build
```

## License
[MIT License](LICENSE)

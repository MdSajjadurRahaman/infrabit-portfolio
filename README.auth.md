# Authentication and Password Reset Implementation

This feature adds proper user authentication and password reset functionality to the InfraBit admin system.

## Features Added

1. **Server-side Authentication**
   - User model with secure password hashing
   - JWT-based authentication
   - Protected API routes with authentication middleware

2. **Authentication Flow**
   - Login with username/password
   - Stores JWT token for session persistence
   - Auto-login on page refresh if token is valid

3. **Password Reset**
   - "Forgot Password" page to request password reset
   - Email-based password reset link
   - Secure token-based password reset form

## Setup Instructions

### Server Setup

1. Install the new dependencies:
   ```bash
   cd server
   npm install bcryptjs jsonwebtoken
   ```

2. Create a `.env` file in the server directory based on `.env.example`
   ```
   JWT_SECRET=your_secure_jwt_secret_key
   MONGODB_URI=mongodb://localhost:27017/infrabit
   CLIENT_URL=http://localhost:5173
   ADMIN_EMAIL=admin@yourdomain.com
   ADMIN_PASSWORD=your_secure_password
   
   # Email Configuration (for password reset emails)
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   EMAIL_FROM=noreply@yourdomain.com
   EMAIL_TO=admin@yourdomain.com
   ```

3. Seed the admin user:
   ```bash
   npm run seed:admin
   ```

### Client Setup

1. Create a `.env` file in the client directory based on `.env.example`
   ```
   VITE_API_URL=http://localhost:5001/api
   ```

## How It Works

1. **Authentication Flow**
   - User enters credentials on the login page
   - Server validates credentials and returns a JWT token
   - Client stores token in localStorage and includes it in future API requests
   - Protected routes check for valid token

2. **Password Reset Flow**
   - User clicks "Forgot Password" and enters email
   - Server generates a reset token and sends email with reset link
   - User clicks link and is taken to reset password form
   - Server validates token and updates password
   - User is automatically logged in after successful reset

## Security Considerations

- Passwords are hashed using bcrypt before storage
- Reset tokens are time-limited (1 hour)
- All admin routes are protected with authentication middleware
- JWT tokens expire after 24 hours

## Testing

- Login with the default admin credentials: admin / Admin@123
- Test password reset by clicking "Forgot Password" link

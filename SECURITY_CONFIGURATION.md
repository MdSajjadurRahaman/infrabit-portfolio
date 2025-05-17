# Security Configuration Guide

This document provides guidance on securely configuring the InfraBit Portfolio application for both development and production environments.

## Environment Variables

The security of your application depends significantly on proper environment variable configuration. Here's how to set them up securely:

### JWT Authentication

```
JWT_SECRET=your_secure_jwt_secret_key
```

- **Development**: Use a random string (min. 32 characters)
- **Production**: Generate a strong random string using a secure method:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- **Never reuse** JWT secrets across different environments
- **Never commit** JWT secrets to version control

### Admin User

```
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_secure_password
```

- These are used to seed the initial admin user
- Use a strong password (min. 12 characters with mix of uppercase, lowercase, numbers, and symbols)
- Change this password after first login
- Consider using a password manager to generate and store this password

### Email Configuration

```
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=true
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
```

- Use application-specific passwords when available from your email provider
- Enable TLS/SSL for email communication by setting `EMAIL_SECURE=true` in production
- Consider using an email service like SendGrid, Mailgun, or Amazon SES for production

## Authentication Security

The application uses JWT (JSON Web Tokens) for authentication with the following security measures:

1. **Token Expiration**: Tokens expire after 24 hours
2. **Password Hashing**: Passwords are hashed using bcrypt
3. **Password Reset**: Tokens expire after 1 hour and are single-use

## Production Recommendations

1. **Enable HTTPS**: Always use HTTPS in production
   - Set up SSL certificates (Let's Encrypt is free)
   - Configure your web server or proxy to enforce HTTPS

2. **Add Security Headers**:
   - Content-Security-Policy
   - X-XSS-Protection
   - X-Content-Type-Options
   - Referrer-Policy

3. **Rate Limiting**:
   - Implement rate limiting for login attempts and password reset requests
   - Consider using a service like Cloudflare for additional protection

4. **Database Security**:
   - Use a strong password for MongoDB
   - Enable authentication and access control
   - Use a firewall to restrict database access to your application server

5. **Regular Updates**:
   - Keep all dependencies updated
   - Subscribe to security bulletins for Node.js and your dependencies

## Docker Security

When using Docker for deployment:

1. Use non-root users in containers
2. Keep images updated
3. Scan images for vulnerabilities
4. Use secrets management for sensitive environment variables

## Monitoring and Logging

Consider implementing:

1. Security event logging
2. Regular log review
3. Intrusion detection
4. Security event alerts

# Frequently Asked Questions (FAQ)

## General Questions

### What is InfraBit Portfolio?
InfraBit Portfolio is a full-stack web application designed for companies in the infrastructure industry to showcase their services, projects, team members, and client testimonials. It includes a public-facing website and an admin panel for content management.

### Is this free to use?
Yes! This project is open source and available under the MIT license, which means you can use, modify, and distribute it freely, even for commercial purposes.

### Can I use this for my own company?
Absolutely! This project was designed to be customizable. Simply replace the content, logos, and styling to match your company's branding.

## Technical Questions

### What technologies does this use?
The frontend is built with React, TypeScript, and Tailwind CSS. The backend uses Node.js, Express, and MongoDB. See the README.md for a complete technology stack.

### How do I customize the design?
The project uses Tailwind CSS for styling. You can customize the design by modifying the tailwind.config.js file and the component styles in the client/src directory.

### Can I deploy this on shared hosting?
While it's possible, we recommend using a platform that supports Node.js applications like Heroku, Vercel, Netlify, or a VPS provider like DigitalOcean or AWS.

### How do I add new content types?
To add new content types (e.g., blog posts), you'll need to:
1. Create a new model in the server/src/models directory
2. Add corresponding controller functions in server/src/controllers
3. Create new API routes in server/src/routes
4. Add UI components and pages in the client/src directory

## Development and Contribution

### How can I contribute to this project?
We welcome contributions! Please see CONTRIBUTING.md for guidelines on how to contribute.

### I found a bug. What should I do?
Please report bugs by opening an issue on our GitHub repository. Include as much detail as possible about how to reproduce the issue.

### How do I suggest a new feature?
Feature requests can be submitted by creating a new issue on our GitHub repository with the "enhancement" label.

## Deployment

### How do I deploy to production?
See DEPLOYMENT.md for detailed instructions on deploying to various environments.

### How do I set up SSL/HTTPS?
For production deployments, we recommend using a reverse proxy like Nginx or a service like Cloudflare to handle SSL termination.

### Can I use this with a different database?
The project is designed to work with MongoDB, but you could modify it to work with other databases by changing the database connection code and models in the server directory.

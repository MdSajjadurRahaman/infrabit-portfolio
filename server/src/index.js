import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Routes
import projectRoutes from './routes/projects.js';
import teamRoutes from './routes/team.js';
import contactRoutes from './routes/contact.js';
import testimonialsRoutes from './routes/testimonials.js';
import servicesRoutes from './routes/services.js';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5001; // Using a non-reserved port

app.use(express.json());

// Configure CORS with specific options
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Add your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// API routes
app.use('/api/projects', projectRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('InfraBit API is running!');
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/infrabit')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

export default app;

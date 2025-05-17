import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  client: {
    type: String,
  },
  duration: {
    type: String,
  },
  challenge: {
    type: String,
  },
  solution: {
    type: String,
  },
  results: {
    type: String,
  },
  gallery: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;

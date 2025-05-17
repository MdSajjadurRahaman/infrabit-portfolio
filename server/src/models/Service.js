import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  longDescription: {
    type: String,
  }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

export default Service;

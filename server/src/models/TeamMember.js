import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
  },
}, { timestamps: true });

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;

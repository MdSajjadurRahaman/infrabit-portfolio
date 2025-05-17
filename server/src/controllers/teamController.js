import TeamMember from '../models/TeamMember.js';

// Get all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort({ order: 1 });
    res.status(200).json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error: error.message });
  }
};

// Get team member by id
export const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.status(200).json(teamMember);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team member', error: error.message });
  }
};

// Create a new team member
export const createTeamMember = async (req, res) => {
  try {
    const newTeamMember = new TeamMember(req.body);
    const savedTeamMember = await newTeamMember.save();
    res.status(201).json(savedTeamMember);
  } catch (error) {
    res.status(400).json({ message: 'Error creating team member', error: error.message });
  }
};

// Update a team member
export const updateTeamMember = async (req, res) => {
  try {
    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTeamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.status(200).json(updatedTeamMember);
  } catch (error) {
    res.status(400).json({ message: 'Error updating team member', error: error.message });
  }
};

// Delete a team member
export const deleteTeamMember = async (req, res) => {
  try {
    const deletedTeamMember = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deletedTeamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team member', error: error.message });
  }
};

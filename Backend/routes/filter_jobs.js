// jobController.js

const express = require('express');
const Jobprop = require('../models/Jobprop');

const jobController = express.Router();

jobController.get('/listJobs', async (req, res) => {
  try {
    const { skills, jobTitle } = req.query;

    // Build the filter object based on the provided parameters
    const filter = {};
    if (skills) {
      filter.skills = { $in: skills.split(',') }; // Assuming skills are comma-separated
    }
    if (jobTitle) {
      filter.jobPosition = { $regex: new RegExp(jobTitle, 'i') }; // Case-insensitive regex match
    }

    // Retrieve jobs based on the filter
    const jobs = await Jobprop.find(filter);

    res.status(200).json({
      Message: 'Jobs retrieved successfully',
      Jobs: jobs,
    });
  } catch (error) {
    res.status(400).json({
      Message: `Error listing jobs: ${error.message}`,
    });
  }
});

module.exports = jobController;

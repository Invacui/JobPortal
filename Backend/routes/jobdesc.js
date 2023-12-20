const express = require("express");
const Jobprop = require("../models/Jobprop");
const IsLoggedIn = require("../middleware/authcheck");

const jobroute = express.Router();
jobroute.get("/addJob", IsLoggedIn, (req, res) => {
  res.send({
    message: "Job_post working!",
  });
});
jobroute.post("/addJob",IsLoggedIn, async (req, res) => {
  console.log(req.body);
  const {
    companyName,
    logoUrl,
    jobPosition,
    monthlySalary,
    jobType,
    remoteOrOffice,
    location,
    jobDescription,
    aboutCompany,
    skills,
    info,
    postedby,
  } = req.body;
  //Bcrypt
  try {
    const user = req.user; //assumes that req.user is being set by the IsLoggedIn middleware, and it updates the jobsPosted array in the user document when a job is successfully posted.
    const firstuser = await Jobprop.create({
      companyName,
      logoUrl,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOrOffice,
      location,
      jobDescription,
      aboutCompany,
      skills,
      info,
      postedBy: user._id,
    });

    // Update the user's jobsPosted array
    user.jobsPosted.push(firstuser._id);
    await user.save();

    res.status(200).json({
      Message: "Job Posted Successfully",
    }); 

  } catch (error) {
    res.status(400).json({
      Message: `Error creating Job: ${error.message}`,
    });
  }
});
//Update Job Post
jobroute.put('/updateJob/:jobId', IsLoggedIn, async (req, res) => {
    try {
      const { jobId } = req.params;
      const updatedJob = req.body; // Assuming the updated job details are sent in the request body
  
      // Update the job based on the job ID
      const result = await Jobprop.findByIdAndUpdate(jobId, updatedJob, { new: true });
  
      if (!result) {
        return res.status(404).json({
          Message: 'Job not found',
        });
      }
  
      res.status(200).json({
        Message: 'Job updated successfully',
        UpdatedJob: result,
      });
    } catch (error) {
      res.status(400).json({
        Message: `Error updating job: ${error.message}`,
      });
    }
  });
  

module.exports = jobroute;

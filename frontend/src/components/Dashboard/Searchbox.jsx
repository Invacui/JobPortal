import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/dashboard.css"

const Searchbox = ({ onSearch , isAuthenticated }) => {
  const [jobPosition, setJobPosition] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const skills = ['Skills', 'C++', 'Java', 'JavaScript', 'React', 'Node'];
  useEffect(() => {
    // This will be triggered whenever isAuthenticated prop changes
    console.log("isAuthenticated changed:", isAuthenticated);
  }, [isAuthenticated]);
  useEffect(() => {
    console.log(`This is data received =>`, jobs);
    onSearch(jobs);
  }, [jobs]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/jobsfilter/search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobPosition, skills: selectedSkills }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log(data);
      setJobs(data.jobs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;

    if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
      setSelectedSkills([...selectedSkills, selectedSkill]);
    }
  };

  const handleClearSkills = () => {
    setSelectedSkills([]);
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter((skill) => skill !== skillToRemove);
    setSelectedSkills(updatedSkills);
  };

  function handleAddjob(){
    navigate("/jobpost/addJob/")
  }

  return (
    <div id='jobrenderbox'>
      <form onSubmit={handleSubmit}>
        
        <div className="jobPosition" id='jobPositionone'>
            <input type="text" id='jobPosition' className="jobPosition" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} placeholder={` Type any job title!`}/>
            <button type="submit">ᐊ</button>
        </div>
        
        <div className="jobPosition">
            <div id="skillsSelectmain">
                <div id="skillsSelect">
                    <select id="skills" value={selectedSkills} onChange={handleSkillChange}>
                      {skills.map((skill) => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                    <div>
                      
                      {selectedSkills.map((skill) => (
                        <div key={skill} id="skillsss">
                          {skill}
                          <button type="button" onClick={() => handleRemoveSkill(skill)}>
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                </div>
                <button type="button" onClick={handleClearSkills} id="clearSkills">
                  Clear
                </button>
            </div>
            <button id={(isAuthenticated?'veiwdetails':'viewdetailsnone')} className='viewdetails ' type="submit" onClick={() => handleAddjob()}>+ Add jobs</button>
        </div>
      </form>
    </div>
  );
};

export default Searchbox;

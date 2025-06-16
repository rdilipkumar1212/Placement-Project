import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import { Box, Button, Chip, TextField } from '@mui/material';
import CompanyService from '../../service/CompanyService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { FaPlus, FaCheckCircle } from 'react-icons/fa'; // React Icons
import AOS from 'aos';
import 'aos/dist/aos.css';

const initialForm = {
  jobTitle: '',
  jobDescription: '',
  jobType: '',
  technicalSkills: [],
  newSkill: '',
  jobLocation: '',
  interviewMode: '',
  salary: '',
  deadline: '',
};

const CreateJobPost = () => {
  const [jobList, setJobList] = useState([]);
  const [newPlacement, setNewPlacement] = useState(initialForm);
  const { companyId } = useParams();

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS for fade effects
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CompanyService.createNewJob({
        ...newPlacement,
        companyId: companyId,
      });

      toast.success('Job post created successfully!');
      fetchJobs();
      setNewPlacement(initialForm);
    } catch (error) {
      console.error('Error creating placement:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await CompanyService.getJobsList();
      setJobList(response);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSkillAdd = () => {
    if (
      newPlacement.newSkill &&
      !newPlacement.technicalSkills.includes(newPlacement.newSkill)
    ) {
      setNewPlacement((prevData) => ({
        ...prevData,
        technicalSkills: [...prevData.technicalSkills, prevData.newSkill],
        newSkill: '',
      }));
    }
  };

  return (
    <div>
      {/* Create New Placement Form */}
      <section
        className="bg-white p-6 rounded-lg shadow-md mb-6"
        data-aos="fade-up"
      >
        <h3 className="text-2xl font-semibold text-purple-800 mb-8 font-sans">
          <FaPlus className="inline mr-2 pb-1" />
          Create New Job
        </h3>
        <form className="space-y-4 mt-" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-purple-800 font-medium mb-2 font-sans"
              >
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                value={newPlacement.jobTitle}
                onChange={(e) =>
                  setNewPlacement({ ...newPlacement, jobTitle: e.target.value })
                }
                className="w-full border border-purple-300 p-2 rounded-md focus:outline-purple-500 font-sans"
                placeholder="Enter job title"
              />
            </div>
            <div>
              <label
                htmlFor="jobType"
                className="block text-purple-800 font-medium mb-2 font-sans"
              >
                Job Type
              </label>
              <select
                id="jobType"
                value={newPlacement.jobType}
                onChange={(e) =>
                  setNewPlacement({ ...newPlacement, jobType: e.target.value })
                }
                className="w-full border border-purple-300 p-2 rounded-md focus:outline-purple-500 font-sans"
              >
                <option value="">Select job type</option>
                <option value="Full-Time" className='font-sans'>Full-Time</option>
                <option value="Internship" className='font-sans'>Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="jobLocation"
                className="block text-purple-800 font-medium mb-2 font-sans"
              >
                Location
              </label>
              <select
                id="jobLocation"
                value={newPlacement.jobLocation}
                onChange={(e) =>
                  setNewPlacement({
                    ...newPlacement,
                    jobLocation: e.target.value,
                  })
                }
                className="w-full border border-purple-300 p-2 rounded-md focus:outline-purple-500 font-sans"
              >
                <option value="" >Select job type</option>
                <option value="Work-from-Office" className='font-sans'>Work from Office</option>
                <option value="Remote" className='font-sans'>Remote</option>
                <option value="Hybrid" className='font-sans'>Hybrid</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="interviewMode"
                className="block text-purple-800 font-medium mb-2 font-sans"
              >
                Interview Mode
              </label>
              <select
                id="interviewMode"
                value={newPlacement.interviewMode}
                onChange={(e) =>
                  setNewPlacement({
                    ...newPlacement,
                    interviewMode: e.target.value,
                  })
                }
                className="w-full border border-purple-300 p-2 rounded-md focus:outline-purple-500 font-sans"
              >
                <option value="">Select job type</option>
                <option value="College" className='font-sans'>College</option>
                <option value="Online" className='font-sans'>Online</option>
                <option value="Off-line" className='font-sans'>Off-line</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="jobDescription"
              className="block text-purple-800 font-medium mb-2 font-sans"
            >
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={newPlacement.jobDescription}
              onChange={(e) =>
                setNewPlacement({
                  ...newPlacement,
                  jobDescription: e.target.value,
                })
              }
              className="w-full border border-purple-300 p-2 rounded-md focus:outline-purple-500 font-sans"
              placeholder="Enter job description"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="technicalSkills"
              className="block text-purple-800 font-medium mb-2 font-sans"
            >
              Technical Skills
            </label>
            <Box
              sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}
              
            >
              {newPlacement.technicalSkills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  color="primary"
                  sx={{ backgroundColor: '#6B46C1', color: 'white', fontFamily: 'Poppins' }}
                />
              ))}
            </Box>
            <Box mt={2} display="flex" gap={1} >
              <TextField
                label="Add Skill"
                fullWidth
                value={newPlacement.newSkill}
                onChange={(e) =>
                  setNewPlacement({ ...newPlacement, newSkill: e.target.value })
                }
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: '#6B46C1', color: 'white', fontFamily: 'Poppins' }}
                onClick={handleSkillAdd}
              >
                <FaCheckCircle className="mr-2 font-sans" /> Add
              </Button>
            </Box>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
            <div>
              <label
                htmlFor="salary"
                className="block text-purple-800 font-medium mb-2 font-sans"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                value={newPlacement.salary}
                onChange={(e) =>
                  setNewPlacement({ ...newPlacement, salary: e.target.value })
                }
                className="w-full border border-purple-300 p-2 rounded-md focus:outline-purple-500 font-sans"
                placeholder="Enter salary"
              />
            </div>
            <div>
              <label
                htmlFor="deadline"
                className="block text-purple-800 font-medium mb-2 font-sans"
              >
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                value={newPlacement.deadline}
                onChange={(e) =>
                  setNewPlacement({ ...newPlacement, deadline: e.target.value })
                }
                className="w-full border border-purple-300 p-2 rounded-md focus:outline-purple-500 font-sans"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 w-full transition-all font-sans"
            >
              Create Job
            </button>
          </div>
        </form>
      </section>

      <JobList fetchJobs={fetchJobs} data={jobList} />
    </div>
  );
};

export default CreateJobPost;

import React, { useState } from 'react';

const TechnicalSkills = () => {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState('');

  const addSkill = () => {
    if (skill.trim() && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkill('');
    }
  };

  const removeSkill = (removedSkill) => {
    setSkills(skills.filter((s) => s !== removedSkill));
  };

  return (
    <div className="technical-skills">
      <label>Technical Skills:</label>
      <div className="skills-input">
        {skills.map((s, index) => (
          <span key={index} className="skill-tag">
            {s} <button onClick={() => removeSkill(s)}>x</button>
          </span>
        ))}
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
        />
        <button onClick={addSkill}>Add</button>
      </div>
    </div>
  );
};

export default TechnicalSkills;

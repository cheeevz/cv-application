import { createContext, useState } from 'react';

export const CVContext = createContext();

export function CVProvider({ children }) {
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
    },
    education: [
      {
        id: 1,
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: '',
      }
    ],
    experience: [
      {
        id: 1,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      }
    ],
    skills: [
      {
        id: 1,
        name: '',
        level: 'intermediate',
      }
    ],
  });

  const updatePersonalInfo = (data) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: data
    }));
  };

  const addEducation = () => {
    const newEducation = {
      id: Math.max(...cvData.education.map(e => e.id), 0) + 1,
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id, data) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, ...data } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addExperience = () => {
    const newExperience = {
      id: Math.max(...cvData.experience.map(e => e.id), 0) + 1,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (id, data) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, ...data } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill = {
      id: Math.max(...cvData.skills.map(s => s.id), 0) + 1,
      name: '',
      level: 'intermediate',
    };
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id, data) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, ...data } : skill
      )
    }));
  };

  const removeSkill = (id) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        updatePersonalInfo,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addSkill,
        updateSkill,
        removeSkill,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

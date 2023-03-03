import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import WorkExperience from '../Profiles/WorkExperience';
import EducationExperience from '../Profiles/EducationExperience';
import '../../styles/CreateProfileModal.scss';

export default function Step2({ handleChange }) {
  const [experience, setExperience] = useState();
  const [workExperiences, setWorkExperiences] = useState([]);
  const [educExperiences, setEducExperiences] = useState([]);
  const [modalClosed, setModalClosed] = useState(true);

  const _workExp = useSelector((state) => state.profile.s2WorkExperiences);
  const _educExp = useSelector((state) => state.profile.s2EducationExperiences);

  useEffect(() => {
    handleChange('s2WorkExperiences', workExperiences);
  }, [workExperiences]);

  useEffect(() => {
    handleChange('s2EducationExperiences', educExperiences);
  }, [educExperiences]);

  useEffect(() => {
    if (_workExp) {
      setWorkExperiences(_workExp);
    }
  }, [_workExp]);

  useEffect(() => {
    if (_educExp) {
      setEducExperiences(_educExp);
    }
  }, [_educExp]);

  const chooseExperience = (event) => {
    const experienceType = event.target.id;
    setModalClosed(false);
    setExperience(experienceType);
  };

  const AddWorkExperience = (new_workExperience) => {
    setWorkExperiences([...workExperiences, new_workExperience]);
  };

  const AddEducExperience = (new_educExperience) => {
    setEducExperiences([...educExperiences, new_educExperience]);
  };

  const renderExperience = () => {
    if (experience === 'workExperience') {
      return (
        <WorkExperience addWorkExperience={AddWorkExperience} setModalClosed={setModalClosed} />
      );
    } else if (experience === 'educationExperience') {
      return (
        <EducationExperience
          addEducExperience={AddEducExperience}
          setModalClosed={setModalClosed}
        />
      );
    } else {
      console.error("User interface doesn't know which experience modal window to show.");
    }
  };

  function getMonthNumberFromName(monthName) {
    return new Date(`${monthName} 1, 2022`).getMonth() + 1;
  }

  return (
    <div className="profile-step2">
      <div className="experience-container">
        <div className="add-experience">
          Add Work experience{' '}
          <button
            type="button"
            id="workExperience"
            className="pic-icon"
            onClick={(e) => chooseExperience(e)}>
            +
          </button>
          {workExperiences.map((exp, index) => (
            <span className="experience-span" key={index}>
              <div className="experience-title">{exp.title}</div>
              <div>
                {getMonthNumberFromName(exp.startMonth.label)}/{exp.startYear.label} -{' '}
                {getMonthNumberFromName(exp.endMonth.label)}/{exp.endYear.label}
              </div>
              <span
                id="delete-button"
                className="material-icons-outlined"
                onClick={() => setWorkExperiences(workExperiences.filter((f) => f !== exp))}>
                delete
              </span>
            </span>
          ))}
        </div>
        <div className="add-experience">
          Add Education experience{' '}
          <button
            type="button"
            id="educationExperience"
            className="pic-icon"
            onClick={(e) => chooseExperience(e)}>
            +
          </button>
          {educExperiences.map((exp, index) => (
            <span className="experience-span" key={index}>
              <div className="experience-title">{exp.degree}</div>
              <div>
                {getMonthNumberFromName(exp.startMonth.label)}/{exp.startYear.label} -{' '}
                {getMonthNumberFromName(exp.endMonth.label)}/{exp.endYear.label}
              </div>
              <span
                id="delete-button"
                className="material-icons-outlined"
                onClick={() => setEducExperiences(educExperiences.filter((f) => f !== exp))}>
                delete
              </span>
            </span>
          ))}
        </div>
      </div>
      {!modalClosed && <div className="dim"></div>}
      {!modalClosed && experience && renderExperience()}
    </div>
  );
}

Step2.propTypes = {
  handleChange: PropTypes.func.isRequired
};

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import WorkExperience from './WorkExperience';
import EducationExperience from './EducationExperience';
import '../../../styles/NewProfileCreation.scss';

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

  return (
    <div className="step step2">
      <div className="experienceContainer">
        <div className="addExperience">
          Add Work experience{' '}
          <button
            type="button"
            id="workExperience"
            className="picIcon"
            onClick={(e) => chooseExperience(e)}>
            +
          </button>
          {workExperiences.map((exp, index) => (
            <span key={index}>
              <div>{exp.title}</div>
              <div>
                {exp.startMonth.label}/{exp.startYear.label} - {exp.endMonth.label}/
                {exp.endYear.label}
              </div>
              <span
                className="material-icons-outlined"
                onClick={() => setWorkExperiences(workExperiences.filter((f) => f !== exp))}>
                delete
              </span>
            </span>
          ))}
        </div>
        <div className="addExperience">
          Add Education experience{' '}
          <button
            type="button"
            id="educationExperience"
            className="picIcon"
            onClick={(e) => chooseExperience(e)}>
            +
          </button>
          {educExperiences.map((exp, index) => (
            <span key={index}>
              <div>{exp.degree}</div>
              <div>
                {exp.startMonth.label}/{exp.startYear.label} - {exp.endMonth.label}/
                {exp.endYear.label}
              </div>
              <span
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

import { ReactComponent as Gps } from '../../image/gps.svg';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/CreateProfileModal.scss';
import '../../styles/_components.scss';

export default function Step6() {
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState([]);
  const [workExp, setWorkExp] = useState([]);
  const [educExp, setEducExp] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('€');
  const [city, setCity] = useState('');
  const [profileIcon, setProfileIcon] = useState(
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'
  );

  const _user = useSelector((state) => state.user);
  const _title = useSelector((state) => state.profile.title);
  const _skills = useSelector((state) => state.profile.skills);
  const _workExp = useSelector((state) => state.profile.workExperiences);
  const _educExp = useSelector((state) => state.profile.educationExperiences);
  const _text = useSelector((state) => state.profile.workInput);
  const _amount = useSelector((state) => state.profile.hourlyInput);
  const _currency = useSelector((state) => state.profile.currency);
  const _city = useSelector((state) => state.profile.city);
  const _profileIcon = useSelector((state) => state.profile.url);

  useEffect(() => {
    if (_title) {
      setTitle(_title);
    }
  }, [_title]);

  useEffect(() => {
    if (_skills) {
      setSkills(_skills);
    }
  }, [_skills]);

  useEffect(() => {
    if (_workExp) {
      setWorkExp(_workExp);
    }
  }, [_workExp]);

  useEffect(() => {
    if (_educExp) {
      setEducExp(_educExp);
    }
  }, [_educExp]);

  useEffect(() => {
    if (_text) {
      setText(_text);
    }
  }, [_text]);

  useEffect(() => {
    if (_amount) {
      setAmount(_amount);
    }
  }, [_amount]);

  useEffect(() => {
    if (_currency) {
      setCurrency(_currency);
    }
  }, [_currency]);

  useEffect(() => {
    if (_city) {
      setCity(_city);
    }
  }, [_city]);

  useEffect(() => {
    if (_profileIcon) {
      setProfileIcon(_profileIcon);
    }
  }, [_profileIcon]);

  return (
    <div className="step step8">
      <div className="previewMainContainer">
        <div className="previewContainer1">
          <div className="photoContainer">
            <img src={profileIcon} alt="" />
          </div>
          <div className="bigContainer">
            <div className="nameContainer">
              <h2 className="firstNameLastName">{_user.displayName}</h2>
            </div>
            <div className="gpsLocation">
              <Gps />
              <p className="currentLocation">{city}</p>
            </div>{' '}
            <div className="jobTitleContainer">
              <h3 className="jobTitle">{title}</h3>
            </div>
            <div className="hourlyPriceContainer">
              <p className="hourlyPrice">
                {amount}
                {currency}/h
              </p>
            </div>
          </div>
          <div>{text}</div>
        </div>
        <div className="previewContainer2">
          <h3>Skills</h3>
          <div className="skillContainer">
            {skills.map((skill, index) => (
              <div key={index}>{skill}</div>
            ))}
          </div>
        </div>
        <div className="previewContainer3">
          {' '}
          <h3>Work Experience</h3>
          {workExp.map((exp, index) => (
            <span key={index}>
              <div>{exp.title}</div>
              <div>
                {exp.startMonth.label}/{exp.startYear.label} - {exp.endMonth.label}/
                {exp.endYear.label}
              </div>
            </span>
          ))}
          {workExp.length === 0 && <p>No items to display.</p>}
        </div>
        <div className="previewContainer4">
          <h3>Education History</h3>
          {educExp.map((exp, index) => (
            <span key={index}>
              <div>{exp.degree}</div>
              <div>
                {exp.startMonth.label}/{exp.startYear.label} - {exp.endMonth.label}/
                {exp.endYear.label}
              </div>
            </span>
          ))}
          {workExp.length === 0 && <p>No items to display.</p>}
        </div>
      </div>
    </div>
  );
}

Step6.propTypes = {
  handleChange: PropTypes.func.isRequired
};

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';
import starIcon from '../image/star.svg';
import jobImage from '../image/martin-dalsgaard-sGV1QDMM0Gg-unsplash.jpg';
import '../styles/ProfileDropdown.scss';

/* Cut a description text to max 30 letter, find the last empty char and 
execute the cut, add ... at the end of the shorted description */
function textCut(text) {
  let length = 30;
  if (text == null) {
    return;
  }
  if (text.length <= length) {
    return text;
  }
  text = text.substring(0, length);
  let last = text.lastIndexOf(' ');
  text = text.substring(0, last);
  return text + '...';
}

/* split a full name to the list, take the first letter of the first name, 
return the capitalized first letter with dot and the last name of the list*/
function initialFirstname(fullname) {
  let names = fullname.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();
  let lastname = names[names.length - 1].substring(0, 8);
  return initials + '. ' + lastname;
}

/* return a status label with different color based on the text */
function taskStatus(task) {
  switch (task) {
    case 'ongoing':
      return <label className="status-ongoing-label">Ongoing</label>;
    case 'completed':
      return <label className="status-completed-label">Completed</label>;
    default:
      return <label className="status-canceled-label">Cancelled</label>;
  }
}

const ProfileDropdown = ({ user, onLogoutClick }) => {
  return (
    <div className="profile-dropdown-main">
      <div className="profile-dropdown-content">
        <div className="profile-box">
          <div className="profile-item">
            <img
              src={user.photoURL}
              className="profile-image"
              referrerPolicy="no-referrer"
              alt=""
            />
          </div>
          <div className="name-price-labels">
            <label className="name-label">{user.displayName}</label>
            <label className="hourly-label">hourly rate: 30 €/h</label>
          </div>
          <div className="right-items">
            <div className="profile-staring">
              <div className="star-image-label">
                <img src={starIcon} alt={'starIcon'} />
                <label className="star-label">4.9</label>
              </div>
              <label className="edit-label">Edit profile</label>
            </div>
          </div>
        </div>
        <div className="content-box">
          <div className="content-row">
            <div className="content-item">
              <label className="item-label">Current saldo</label>
              <label className="item-value">20,00</label>
            </div>
            <div className="content-item">
              <label className="item-label">Active sells</label>
              <label className="item-value">15</label>
            </div>
          </div>
          <div className="content-row">
            <div className="content-item">
              <label className="item-label">Active buys</label>
              <label className="item-value">2</label>
            </div>
            <div className="content-item">
              <label className="item-label">Inbox messages</label>
              <label className="item-value">5</label>
            </div>
          </div>
        </div>
        <div className="create-job-button">
          <Link to="calendar/job-creation">
            <Button className="job-button">Create a job</Button>
          </Link>
        </div>
        <div className="create-job-button">
          <Link to="new-profile-creation">
            <Button className="job-button">Edit profile</Button>
          </Link>
        </div>
        <div className="create-job-button">
          <Link to="buyers-profile">
            <Button className="job-button">Buyers profile test</Button>
          </Link>
        </div>
        <div className="tasks-box">
          <div className="task-view-labels">
            <label className="task-label">Tasks</label>
            <label className="view-label">View</label>
          </div>
          <div className="task-content">
            <div className="task-image">
              <img src={jobImage} className="image-left" alt="" />
            </div>
            <div className="task-details">
              <label className="description">
                {textCut('I will walk your dog with love and care')}
              </label>
              <div className="status-price-date-labels">
                {taskStatus('ongoing')}
                <label className="price-label">30 €/h</label>
                <label className="date-label">22/02/2023</label>
              </div>
            </div>
            <div className="task-arrow-owner">
              <label className="arrow-label">{'>'}</label>
              <label className="owner-label">{initialFirstname('Mikko Manninen')}</label>
            </div>
          </div>
        </div>
      </div>
      <div className="lower-icon-box">
        <span
          className="material-icons-outlined"
          onClick={() => {
            onLogoutClick();
          }}>
          logout
        </span>
      </div>
    </div>
  );
};

ProfileDropdown.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired
  }).isRequired,
  onLogoutClick: PropTypes.func.isRequired
};

export default ProfileDropdown;

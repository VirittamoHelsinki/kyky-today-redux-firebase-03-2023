import React from 'react';
import Button from './Button';
import jobImage from '../image/martin-dalsgaard-sGV1QDMM0Gg-unsplash.jpg';
import '../styles/ProfileDropdown.scss';

const ProfileDropdown = ({ user }) => {
  return (
    <div className="profile-dropdown-main">
      <div className="profile-box">
        <div className="profile-item">
          <img src={user.photoURL} className="profile-image" referrerPolicy="no-referrer" alt="" />
        </div>
        <div className="name-price-labels">
          <label className="name-label">{user.displayName}</label>
          <label className="hourly-label">hourly rate: 30 €/h</label>
        </div>
        <div className="right-items">
          <div className="profile-staring">
            <label className="star-label">* 4.9</label>
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
            <label className="item-label">Incoming messages</label>
            <label className="item-value">5</label>
          </div>
        </div>
      </div>
      <div className="create-job-button">
        <Button>Create a job</Button>
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
            <label className="description">I will walk your dog with love and care</label>
            <div className="status-price-date-labels">
              <label className="status-label">Ongoing</label>
              <label className="price-label">30 €/h</label>
              <label className="date-label">22/02/2023</label>
            </div>
          </div>
          <div className="task-arrow-owner">
            <div className="arrow-icon">
              <span className="material-icons-outlined">keyboard_arrow_right</span>
            </div>
            <label className="owner-label">James Smith</label>
          </div>
        </div>
      </div>
      <div className="log-out-button">
        <Button>Log out</Button>
      </div>
    </div>
  );
};

export default ProfileDropdown;

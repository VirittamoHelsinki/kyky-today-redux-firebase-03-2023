import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/Profiles.scss';

const Settings = () => {
  const setSelectedWindow = useOutletContext();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setSelectedWindow('settings');
  }, []);

  return (
    <div className="settings-main">
      <div className="settings-edit-photo-content">
        <div className="photo-image">
          <img
            className="image"
            src="https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp"
            alt=""
          />
        </div>
        <div className="photo-text-content">
          <div className="photo-title">
            <p>Change Photo</p>
          </div>
          <div className="photo-description">
            <p>Your photo should show your face clearly, we suggest a neutral background</p>
          </div>
        </div>
      </div>
      <div className="settings-change-password-content">
        <div className="headline">
          <p>Change password</p>
        </div>
        <div className="change-password-label-and-input">
          <div className="label-text">
            <p>Current password</p>
          </div>
          <div className="input-field-box">
            <input
              className="input-field"
              type="text"
              name="current-password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="change-password-label-and-input">
          <div className="label-text">
            <p>New password</p>
          </div>
          <div className="input-field-box">
            <input
              className="input-field"
              type="text"
              name="new-password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="change-password-label-and-input">
          <div className="label-text">
            <p>Confirm password</p>
          </div>
          <div className="input-field-box">
            <input
              className="input-field"
              type="text"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="save-password-content">
          <button className="save-password-button">Save password</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

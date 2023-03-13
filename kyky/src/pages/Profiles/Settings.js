import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import '../../styles/Profiles.scss';

const Settings = () => {
  const setSelectedWindow = useOutletContext();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const _user = useSelector((state) => state.user)

  useEffect(() => {
    setSelectedWindow('settings');
  }, []);

  return (
    <div className="settings-main">
      {_user.authProvider === 'google' ? (
        <div className="settings-content">
          <div className="settings-google-login-content">
            <div className="google-login-title">
              <p>You are logged in with your Google account.</p>
            </div>
            <div className="google-login-description">
              <p>Manage Google settings in your Google Myaccount -page</p>
            </div>
          </div>
        </div>
      ) : (
      <div className="settings-content">
        <div className="settings-edit-photo-content">
          <div className="photo-image">
            <img
              className="image"
              src={_user.photoURL}
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
      )}
    </div>
  );
};

export default Settings;

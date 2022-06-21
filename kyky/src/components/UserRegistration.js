import { useContext, useState } from 'react';
import Language from '../language';
import 'material-icons/iconfont/material-icons.css';

function UserRegistration() {
  const { lang } = useContext(Language);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validateUserName, setValidateUserName] = useState(false);
  const [username, setUsername] = useState('');

  const handleUsernameValidation = ({ target: { value } }) => {
    if (value === '' || value.length < 3) {
      return setValidateUserName(false);
    }
    return setValidateUserName(true);
  };

  return (
    <form className="card-light small">
      <h1>{lang.registration.title}</h1>
      <section>
        <div className="input-container">
          <label htmlFor="username">{lang.registration.username}</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder={lang.registration.username}
            autoComplete="username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
              handleUsernameValidation(e);
            }}
          />
          {validateUserName && <i className="material-icons-outlined inside">done</i>}
          <i className="material-icons-outlined">info</i>
        </div>
        <div className="input-container">
          <label htmlFor="email">{lang.registration.email}</label>
          <input
            type="email"
            name="email"
            placeholder={lang.registration.email}
            autoComplete="email"
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">{lang.registration.password}</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            placeholder={lang.registration.password}
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            className="material-icons-outlined"
            onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? 'visibility_off' : 'visibility'}
          </button>
        </div>
        <div className="input-container">
          <label htmlFor="password">{lang.registration.confirm_password}</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="confirmPassword"
            placeholder={lang.registration.confirm_password}
            autoComplete="off"
            required
          />
          <button
            type="button"
            className="material-icons-outlined"
            onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? 'visibility_off' : 'visibility'}
          </button>
        </div>
        <div className="input-container">
          <label htmlFor="company">{lang.registration.company}</label>
          <select name="company" placeholder={lang.registration.company}>
            <option value="">{lang.common.dropdown_default}</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>
        <div className="checkbox-container no-shadow">
          <input type="checkbox" name="subscribe_newsletter" value="subscribe_newsletter" />
          <label className="checkbox-label" htmlFor="subscribe_newsletter">
            {lang.registration.subscribe_newsletter}
          </label>
        </div>
        <div className="checkbox-container no-shadow">
          <input type="checkbox" name="user_agreement" value="user_agreement" required />
          <label className="checkbox-label" htmlFor="user_agreement">
            {lang.registration.I_agree}
            <a href="https://www.google.com/">{lang.registration.user_agreement}</a>
          </label>
        </div>
      </section>
      <button type="submit" className="button-primary">
        {lang.registration.submit_form}
      </button>
      <span className="login-help">
        <a href="https://www.google.com/">{lang.registration.sign_in}</a>
        {lang.registration.or}
        <a href="https://www.google.com/">{lang.registration.recover_password}</a>
      </span>
    </form>
  );
}

export default UserRegistration;

import { useContext, useState } from 'react';
import Language from '../language';
import Input from '../components/Input';
import 'material-icons/iconfont/material-icons.css';

function UserRegistration() {
  const { lang } = useContext(Language);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [usernameCheck, setUsernameCheck] = useState(false);

  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [passwordConfirmIsValid, setPasswordConfirmIsValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usernameIsValid && emailIsValid && passwordIsValid && passwordConfirmIsValid) {
      console.log('submit');
    }
  };

  const handleFormValidation = () => {
    if (username.length < 5) {
      setUsernameIsValid(false);
    } else {
      setUsernameIsValid(true);
    }
    if (email.length < 5 || !email.includes('@') || !email.includes('.')) {
      setEmailIsValid(false);
    } else {
      setEmailIsValid(true);
    }
    if (password.length < 8 || password !== passwordConfirm) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
    if (passwordConfirm < 8 || password !== passwordConfirm) {
      setPasswordConfirmIsValid(false);
    }
    if (passwordConfirm === password) {
      setPasswordConfirmIsValid(true);
    }
  };

  const handleUsernameValidation = ({ target: { value } }) => {
    setUsername(value);
    if (value.length < 5) {
      setUsernameCheck(false);
    } else {
      setUsernameCheck(true);
    }
  };

  return (
    <form className="card-light small" onSubmit={handleSubmit}>
      <h1>{lang.registration.title}</h1>
      <section>
        <Input
          label={lang.registration.username}
          type="text"
          name="username"
          value={username}
          placeholder={lang.registration.username}
          className={`input-container ${usernameIsValid ? '' : 'error'}`}
          autoComplete="username"
          iconText="info"
          onChange={(e) => {
            handleUsernameValidation(e);
            setUsername(e.target.value);
          }}>
          {usernameCheck && <i className="material-icons-outlined inside">done</i>}
        </Input>
        <Input
          label={lang.registration.email}
          type="email"
          name="email"
          value={email}
          placeholder={lang.registration.email}
          className={`input-container ${emailIsValid ? '' : 'error'}`}
          autoComplete="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Input
          label={lang.registration.password}
          type={passwordVisible ? 'text' : 'password'}
          name="password"
          value={password}
          placeholder={lang.registration.password}
          className={`input-container ${passwordIsValid ? '' : 'error'}`}
          autoComplete="new-password"
          iconText={passwordVisible ? 'visibility_off' : 'visibility'}
          iconOnClick={() => setPasswordVisible(!passwordVisible)}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Input
          label={lang.registration.confirm_password}
          type={passwordVisible ? 'text' : 'password'}
          name="passwordConfirm"
          value={passwordConfirm}
          placeholder={lang.registration.confirm_password}
          className={`input-container ${passwordConfirmIsValid ? '' : 'error'}`}
          autoComplete="off"
          iconText={passwordVisible ? 'visibility_off' : 'visibility'}
          iconOnClick={() => setPasswordVisible(!passwordVisible)}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
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
          <input type="checkbox" name="user_agreement" value="user_agreement" />
          <label className="checkbox-label" htmlFor="user_agreement">
            {lang.registration.I_agree}
            <a href="https://www.google.com/">{lang.registration.user_agreement}</a>
          </label>
        </div>
      </section>
      <button type="submit" className="button-primary" onClick={() => handleFormValidation()}>
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

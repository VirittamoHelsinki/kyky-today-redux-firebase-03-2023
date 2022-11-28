import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/userSlice';
import Language from '../language';
import Input from '../components/Input';
import 'material-icons/iconfont/material-icons.css';
import Checkbox from '../components/Checkbox';
// import CheckboxContainer from '../components/CheckboxContainer';

function UserRegistration() {
  const { lang } = useContext(Language);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [usernameCheck, setUsernameCheck] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [company, setCompany] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [terms, setTerms] = useState(false);

  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [passwordConfirmIsValid, setPasswordConfirmIsValid] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      usernameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      passwordConfirmIsValid &&
      termsAccepted
    ) {
      console.log('submit');
      console.log(username, email, password, passwordConfirm, company, subscribe, termsAccepted);
      dispatch(
        signUp({
          username: username,
          email: email,
          password: password,
          company: company,
          subscribe: subscribe,
          termasAccepted: termsAccepted
        })
      );
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
    if (password.length < 8) {
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
    if (!terms) {
      setTermsAccepted(false);
    } else {
      setTermsAccepted(true);
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
    <main className="wrapper fixed-centered">
      <form className="card light small shadow" onSubmit={handleSubmit}>
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

          <Input
            label={lang.registration.company}
            type="text"
            name="company"
            value={company}
            placeholder={lang.registration.company}
            autoComplete="off"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
        </section>
        <section>
          <Checkbox
            label={lang.registration.subscribe_newsletter}
            name="subscribe"
            value={subscribe}
            className="checkbox-container no-shadow"
            onChange={(e) => {
              setSubscribe(e.target.checked);
            }}
          />
          <Checkbox
            name="terms"
            value={terms}
            className={`checkbox-container no-shadow ${termsAccepted ? '' : 'error'}`}
            onChange={(e) => {
              setTerms(e.target.checked);
            }}>
            {lang.registration.I_agree}
            <a className="primary" href="https://www.google.com/">
              {lang.registration.terms}
            </a>
          </Checkbox>
        </section>
        <button type="submit" className="button-primary" onClick={() => handleFormValidation()}>
          {lang.registration.submit_form}
        </button>
        <span className="login-help">
          <a className="primary" href="https://www.google.com/">
            {lang.registration.sign_in}
          </a>
          {lang.registration.or}
          <a className="primary" href="https://www.google.com/">
            {lang.registration.recover_password}
          </a>
        </span>
      </form>
    </main>
  );
}

export default UserRegistration;

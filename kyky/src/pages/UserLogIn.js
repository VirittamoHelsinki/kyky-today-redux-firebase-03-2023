import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { signInEmailAndPassword, signInGoogleAuthProvider } from '../redux/userSlice';
import Language from '../language';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import 'material-icons/iconfont/material-icons.css';

function UserLogIn() {
  const { lang } = useContext(Language);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [creditalError] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      return;
    }
    dispatch(
      signInEmailAndPassword({
        email: username,
        password: password
      })
    );
    console.log('username:', username, 'password:', password, 'remember me:', remember);
    alert(`Matching username and password: ${creditalError}`);
  };

  const onGoogleClick = () => {
    dispatch(signInGoogleAuthProvider());
  };

  const onFacebookClick = () => {
    //dispatch(signInFacebookAuthProvider());
    console.log('facebook app needed');
  };

  const onAppleClick = () => {
    //dispatch(signInAppleAuthProvider());
    console.log('apple app needed');
  };

  return (
    <main className="wrapper fixed-centered">
      <form className="card light small shadow centered" onSubmit={handleSubmit}>
        <section>
          <h1>Kirjaudu sisään - Kyky</h1>
          <Input
            label={lang.registration.username}
            type="text"
            name="username"
            value={username}
            placeholder={lang.registration.username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label={lang.registration.password}
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={password}
            placeholder={lang.registration.password}
            autoComplete="new-password"
            iconText={passwordVisible ? 'visibility_off' : 'visibility'}
            iconOnClick={() => setPasswordVisible(!passwordVisible)}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </section>
        <Checkbox
          label={lang.registration.remember}
          name="remember"
          value={remember}
          onChange={(e) => setRemember(e.target.checked)}
          checked={remember}>
          Pidä minut kirjautuneena
        </Checkbox>
        <Button type="submit" onClick={handleSubmit}>
          Kirjaudu sisään
        </Button>
        <p>Tai:</p>
        <Button
          onClick={() => {
            onGoogleClick();
          }}>
          Kirjaudu Googlella
        </Button>
        <Button
          onClick={() => {
            onFacebookClick();
          }}>
          Kirjaudu Facebookilla
        </Button>
        <Button
          onClick={() => {
            onAppleClick();
          }}>
          Kirjaudu Applella
        </Button>
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

export default UserLogIn;

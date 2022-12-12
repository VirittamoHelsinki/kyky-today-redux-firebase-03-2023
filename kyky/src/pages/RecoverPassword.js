import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { recoverPasswordResetEmail } from '../redux/userSlice';
import Input from '../components/Input';
import Button from '../components/Button';
import 'material-icons/iconfont/material-icons.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== '') {
      dispatch(recoverPasswordResetEmail(email));
      alert('An email, if exists, has been sent');
      setEmail('');
    }
  };

  return (
    <main className="wrapper fixed-centered">
      <form className="card light small shadow centered" onSubmit={handleSubmit}>
        <section>
          <h1>Palauta salasana sähköpostiisi - Kyky</h1>
          <Input
            label="email"
            type="email"
            name="email"
            value={email}
            placeholder="email address"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </section>
        <Button type="submit" onClick={handleSubmit}>
          Palauta salasana
        </Button>
      </form>
    </main>
  );
};

export default ForgotPassword;

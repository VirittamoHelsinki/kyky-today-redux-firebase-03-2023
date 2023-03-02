import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { contactUs } from '../../redux/chat/adminContactSlice';
import '../../styles/ContactUs.scss';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function sendMessage() {
    if (name !== '' && email !== '' && message !== '') {
      dispatch(contactUs({ name: name, email: email, message: message }));
      setName('');
      setEmail('');
      setMessage('')
      window.alert('Thank you for contacting us!');
    } else {
      window.alert('Please fill all fields');
    }
  }

  return (
    <div className="contact-us-main">
      <div className="contact-us-headline">
        <p>Contact us</p>
      </div>
      <div className="contact-us-description">
        <p>Send us a message and we will contact you as soon as possible</p>
      </div>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="button-container">
        <button onClick={sendMessage}>Send message</button>
      </div>
    </div>
  );
};

export default ContactUs;

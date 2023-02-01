import { useState } from 'react';
import contacts from '../../mock_chats.json';
import '../../styles/BuyersProfile.scss';

const Messages = ({ user }) => {
  const [selectedContact, setSelectedContact] = useState([]);

  return (
    <div className="messages-main">
      <div className="contacts-content">
        <div className="contact-list">
          {contacts.map((c, index) => (
            <div
              className="contact"
              key={index}
              onClick={() => {
                setSelectedContact(c.messages);
              }}>
              <div className="contact-left-side">
                <img
                  src="https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp"
                  className="profile-img"
                  referrerPolicy="no-referrer"
                  alt=""
                />
                <div className="name-latest-message-paragraph">
                  <p className="name-paragraph">Emerson Fittipaldi</p>
                  <p className="latest-message-paragraph">ok done..</p>
                </div>
              </div>
              <div className="contact-right-side">
                <p className="time-since-last-message">1 hr</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="messages-content">
        <div className="messages-list">
          {selectedContact.map((m) => (
            <div className={`message-${user.uid === m.userid ? 'myself' : 'friend'}`}>
              <div className="message-box">{m.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;

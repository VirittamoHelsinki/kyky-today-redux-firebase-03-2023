import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/chat/contactSlice';
import { addMessage, fetchMessages } from '../../redux/chat/messageSlice';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import PropTypes from 'prop-types';
import '../../styles/BuyersProfile.scss';

const Messages = () => {
  const setSelectedWindow = useOutletContext();
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [chatId, setChatId] = useState(null);

  const dispatch = useDispatch();

  const _contacts = useSelector((state) => state.chat.contacts);
  const _messages = useSelector((state) => state.message.messages);
  const _user = useSelector((state) => state.user);

  useEffect(() => {
    setSelectedWindow('messages');
  }, []);

  useEffect(() => {
    dispatch(fetchContacts(_user.uid));
  }, []);

  useEffect(() => {
    if (Array.isArray(_contacts)) {
      setContacts(_contacts);
    }
  }, [_contacts]);

  useEffect(() => {
    if (Array.isArray(_messages)) {
      setMessages(_messages);
    }
  }, [_messages]);

  /* listen changes in chatlogs's selected chat, loops message objects 
  from the data() object to the list until data()[i] is undefined, 
  usually all firebase related to redux slices but listeners are exception. */
  useEffect(() => {
    if (chatId) {
      onSnapshot(doc(db, 'chatlogs', chatId), (doc) => {
        let msgs = [];
        let i = 0;
        while (doc.data()[i]) {
          msgs.push(doc.data()[i]);
          i++;
        }
        setMessages(msgs);
      });
    }
  }, [chatId]);

  function onSendButtonClick() {
    if (messageInput !== '') {
      const new_msg = {
        uid: _user.uid,
        message: messageInput,
        timestamp: Math.floor(Date.now() / 1000)
      };
      const new_msgs = [...messages];
      new_msgs.push(new_msg);
      dispatch(addMessage({ chatId: chatId, data: new_msgs }));
      setMessageInput('');
    }
  }

  /* add timeStamp(message.timestamp) to messages.map */
  // function timeSince(timestamp) {
  //   let seconds = Math.floor(new Date() / 1000 - parseInt(timestamp));
  //   let interval = seconds / 31536000;
  //   if (interval > 1) {
  //     return Math.floor(interval) + ' years';
  //   }
  //   interval = seconds / 2592000;
  //   if (interval > 1) {
  //     return Math.floor(interval) + ' months';
  //   }
  //   interval = seconds / 86400;
  //   if (interval > 1) {
  //     return Math.floor(interval) + ' days';
  //   }
  //   interval = seconds / 3600;
  //   if (interval > 1) {
  //     return Math.floor(interval) + ' hrs';
  //   }
  //   interval = seconds / 60;
  //   if (interval > 1) {
  //     return Math.floor(interval) + ' min';
  //   }
  //   return Math.floor(seconds) + ' sec';
  // }

  return (
    <div className="messages-main">
      <div className="contacts-content">
        <div className="contact-list">
          {contacts.map((contact, index) => (
            <div
              className={`contact${contact.chatId === chatId ? ' selected' : ''}`}
              key={index}
              onClick={() => {
                setChatId(contact.chatId);
                dispatch(fetchMessages(contact.chatId));
              }}>
              <div className="contact-left-side">
                <img
                  src={contact.photoURL}
                  className="profile-img"
                  referrerPolicy="no-referrer"
                  alt=""
                />
                <div className="name-latest-message-paragraph">
                  <p className="name-paragraph">{contact.name}</p>
                  <p className="latest-message-paragraph">ok done..</p>
                </div>
              </div>
              <div className="contact-right-side">
                <p className="time-since-last-message">1h</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!chatId ? (
        <div className="no-contacts-select-content">
          <div className="no-contacts-select-box">Please select a conversation</div>
        </div>
      ) : (
        <div className="messages-content">
          <div className="messages-list">
            {/* to force the scroll bar down css has set to "flex-direction: column-reverse", so this is reversed too */}
            {messages
              .map((message, index) => (
                <div
                  key={index}
                  className={`message-${_user.uid === message.uid ? 'myself' : 'friend'}`}>
                  <div className="message-box">{message.message}</div>
                </div>
              ))
              .reverse()}
          </div>
          <div className="messages-send">
            <input
              className="messages-send-input"
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="write a message..."></input>
            <button className="messages-send-button" onClick={onSendButtonClick}>
              send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Messages.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }).isRequired
};

export default Messages;

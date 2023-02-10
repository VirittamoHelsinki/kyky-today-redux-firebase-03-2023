import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import starIcon from '../image/star.svg';
import '../styles/UserProfile.scss';

const sample =
  'Lyökämme käsi kätehen, sormet sormien lomahan, lauloaksemme hyviä, parahia pannaksemme, kuulla noien kultaisien, tietä mielitehtoisien, nuorisossa nousevassa, kansassa kasuavassa: noita saamia sanoja, virsiä virittämiä vyöltä vanhan Väinämöisen, alta ahjon Ilmarisen, päästä kalvan Kaukomielen, Joukahaisen jousen tiestä, Pohjan peltojen periltä, Kalevalan kankahilta.';

const UserProfile = () => {
  const [profileName, setProfileName] = useState('Etunimi Sukunimi');
  const [profileTitle, setProfileTitle] = useState('Profile Title');
  const [profileRating, setProfileRating] = useState(5);
  const [onlineStatus, setOnlineStatus] = useState('Offline');
  const [lastSeen, setLastSeen] = useState(new Date('2023-02-03'));
  const [registered, setRegistered] = useState(new Date('2023-01-12'));
  const [userType, setUserType] = useState('Seller');
  const [location, setLocation] = useState('Helsinki, Finland');
  const [allJobs, setAllJobs] = useState('4');
  const [ongoingBookings, setOngoingBookings] = useState('3');
  const [description, setDescription] = useState(sample);
  const [cards, setCards] = useState([]);
  const [profileImage, setProfileImage] = useState(
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'
  );

  const _cards = useSelector((state) => state.jobs.cards);

  useEffect(() => {
    if (_cards) {
      setCards(_cards);
    }
  }, [_cards]);

  function loopStars() {
    let star_img_list = [];
    for (let i = 0; i < profileRating; i++) {
      star_img_list.push(<img className="star-img" key={i} src={starIcon} alt="" />);
    }
    return star_img_list;
  }

  return (
    <div className="user-profile-content">
      <div className="user-profile-main">
        <div className="user-profile-right-content">
          <div className="user-profile-user-info">
            <div className="user-info-image">
              <img className="rounded-image" src={profileImage} alt="" />
            </div>
            <div className="user-info-name">
              <p>{profileName}</p>
            </div>
            <div className="user-info-title">
              <p>{profileTitle}</p>
            </div>
            <div className="user-info-rating">{loopStars().map((star) => star)}</div>
            <div className="user-info-contact-button">
              <button className="contact-button">Contact Seller</button>
            </div>
          </div>
          <div className="user-profile-user-data">
            <div className="user-data-item">
              <p className="user-data-key">Online-tila</p>
              <p className="user-data-value">{onlineStatus}</p>
            </div>
            <div className="user-data-item">
              <p className="user-data-key">Viimeksi online</p>
              <p className="user-data-value">{lastSeen.toDateString()}</p>
            </div>
            <div className="user-data-item">
              <p className="user-data-key">Rekisteröitynyt</p>
              <p className="user-data-value">{registered.toDateString()}</p>
            </div>
            <div className="user-data-item">
              <p className="user-data-key">User type</p>
              <p className="user-data-value">{userType}</p>
            </div>
            <div className="user-data-item">
              <p className="user-data-key">Sijainti</p>
              <p className="user-data-value">{location}</p>
            </div>
          </div>
          <div className="user-profile-jobs-tasks">
            <div className="jobs-tasks-item">
              <p className="jobs-task-key">Kaikki käyttäjän työt</p>
              <p className="jobs-tasks-value">{allJobs}</p>
            </div>
            <div className="jobs-tasks-item">
              <p className="jobs-tasks-key">Käynnissä olevat tilaukset</p>
              <p className="jobs-tasks-value">{ongoingBookings}</p>
            </div>
          </div>
          <div className="user-profile-description">
            <div className="description-headline">
              <p>Kuvaus</p>
            </div>
            <div className="description-text">
              <p>{description}</p>
            </div>
          </div>
        </div>
        <div className="user-profile-left-content">
          <div className="user-profile-user-jobs-title">
            <p>Käyttäjän työpaikat</p>
          </div>
          <div className="user-profile-user-cards-wrap">
            {cards.map((card, index) => (
              <Card job={card} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

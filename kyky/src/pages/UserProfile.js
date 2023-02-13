import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../redux/auth/slugSlice';
import { getProfileForm } from '../redux/sellers/profileFormSlice';
import { fetchJobsByQuery } from '../redux/sellers/jobFormSlice';
import { createContact } from '../redux/chat/contactSlice';
import Card from '../components/Card';
import starIcon from '../image/star.svg';
import '../styles/UserProfile.scss';

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
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState([]);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(
    'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'
  );

  const _cards = useSelector((state) => state.jobs.cards);
  const _uid = useSelector((state) => state.slug);
  const _profile = useSelector((state) => state.profile.userProfile);
  const _user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { slug } = useParams();

  useEffect(() => {
    if (_user) {
      setUser(_user);
    }
  }, []);

  useEffect(() => {
    dispatch(getUserId(slug));
  }, []);

  useEffect(() => {
    if (_uid.uid) {
      dispatch(getProfileForm(_uid.uid));
      dispatch(fetchJobsByQuery({ key: 'uid', value: _uid.uid }));
    }
  }, [_uid]);

  useEffect(() => {
    if (_profile?.name) {
      setProfileImage(_profile.s7Url);
      setProfileName(_profile.name);
      setProfileTitle(_profile.s1Title);
      setLocation(_profile.s7City + ', ' + _profile.s7Country.label);
      setDescription(_profile.s4WorkInput);
    }
  }, [_profile]);

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

  function onContactClick() {
    dispatch(
      createContact({
        myUid: user.uid,
        myName: user.displayName,
        myPhotoURL: user.photoURL,
        contactUid: _uid.uid,
        contactName: _uid.name,
        contactPhotoURL: _uid.photoURL
      })
    );
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
              <button
                className="contact-button"
                onClick={() => {
                  onContactClick();
                  navigate('/buyers-profile');
                }}>
                Contact Seller
              </button>
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

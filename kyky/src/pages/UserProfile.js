import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../redux/auth/slugSlice';
import { getUserProfile } from '../redux/profiles/profileSlice';
import { fetchUserProfileJobs } from '../redux/jobs/jobSlice';
import { createContact } from '../redux/chat/contactSlice';
import { addNotification } from '../redux/notifications/notificationSlice';
import { fetchRatings } from '../redux/profiles/ratingSlice';
import Card from '../components/Card';
import starFilled from '../image/star-filled.svg';
import starBlank from '../image/star-white.svg';
import '../styles/UserProfile.scss';

const UserProfile = () => {
  const [profileName, setProfileName] = useState('');
  const [profileTitle, setProfileTitle] = useState('');
  const [profileRating, setProfileRating] = useState(5);
  const [onlineStatus, setOnlineStatus] = useState('Offline');
  const [lastseen, setLastseen] = useState(new Date('2023-02-03'));
  const [registered, setRegistered] = useState(new Date('2023-01-12'));
  const [userType, setUserType] = useState('Seller');
  const [location, setLocation] = useState('');
  const [allJobs, setAllJobs] = useState('4');
  const [ongoingBookings, setOngoingBookings] = useState('3');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [cards, setCards] = useState([]);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [ratings, setRatings] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const _cards = useSelector((state) => state.jobs.userProfileCards);
  const _uid = useSelector((state) => state.slug);
  const _profile = useSelector((state) => state.profile.userProfile);
  const _user = useSelector((state) => state.user);
  const _ratings = useSelector((state) => state.rating.ratings);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { slug } = useParams();

  useEffect(() => {
    if (_user.uid) {
      setUser(_user);
    }
  }, []);

  useEffect(() => {
    dispatch(getUserId(slug));
  }, []);

  useEffect(() => {
    if (_uid.uid) {
      dispatch(getUserProfile(_uid.uid));
      dispatch(fetchUserProfileJobs(_uid.uid));
      dispatch(fetchRatings(_uid.uid));
    }
  }, [_uid]);

  useEffect(() => {
    if (_profile?.name) {
      setProfileImage(_profile.s7Url);
      setProfileName(_profile.name);
      setProfileTitle(_profile.s1Title);
      setLocation(_profile.s7City + ', ' + _profile.s7Country.label);
      setDescription(_profile.s4WorkInput);
      setSkills(_profile.s1Skills);
      setLastseen(new Date(_profile.lastseen.seconds * 1000));
      setRegistered(new Date(_profile.created.seconds * 1000));
      _profile.totalAmount > 0 &&
        setProfileRating(parseInt(_profile.totalRating / _profile.totalAmount));
    }
  }, [_profile]);

  useEffect(() => {
    if (_cards) {
      setCards(_cards);
    }
  }, [_cards]);

  useEffect(() => {
    if (Array.isArray(_ratings)) {
      setRatings(_ratings);
    }
  }, [_ratings]);

  function loopReviewStars(rating) {
    let star_img_list = [];
    for (let i = 0; i < rating; i++) {
      star_img_list.push(<img className="review-star-img" key={i} src={starFilled} alt="" />);
    }
    for (let i = rating; i < 5; i++) {
      star_img_list.push(<img className="review-star-img" key={i} src={starBlank} alt="" />);
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
    dispatch(
      addNotification({
        uid: _uid.uid,
        notification: {
          text: user.displayName + ' send you a message',
          to: '/seller/messages',
          read: false
        }
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
            <div className="user-info-rating-reviews-button">
              <div className="user-info-rating">
                {loopReviewStars(profileRating).map((star) => star)}
              </div>
              <div className="user-info-reviews-button">
                {ratings.length > 0 ? (
                  <p
                    className="reviews-button"
                    onClick={() => {
                      setShowReviewModal(true);
                    }}>
                    {ratings.length} ratings
                  </p>
                ) : (
                  <p className="reviews-button noratings">0 rating</p>
                )}
              </div>
            </div>
            <div className="user-info-contact-button">
              {user ? (
                <button
                  className="contact-button-enabled"
                  onClick={() => {
                    onContactClick();
                    navigate('/buyer/messages');
                  }}>
                  Contact Seller
                </button>
              ) : (
                <button className="contact-button-disabled">Contact Seller</button>
              )}
            </div>
          </div>
          <div className="user-profile-user-data">
            <div className="user-data-item">
              <p className="user-data-key">Online-tila</p>
              <p className="user-data-value">{onlineStatus}</p>
            </div>
            <div className="user-data-item">
              <p className="user-data-key">Viimeksi online</p>
              <p className="user-data-value">{lastseen.toLocaleDateString('fi-FI')}</p>
            </div>
            <div className="user-data-item">
              <p className="user-data-key">Rekisteröitynyt</p>
              <p className="user-data-value">{registered.toLocaleDateString('fi-FI')}</p>
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
          <div className="user-profile-skills">
            <div className="skills-headline">
              <p>Taidot</p>
            </div>
            <div className="skills-content">
              {skills.map((skill, index) => (
                <div className="skill" key={index}>
                  {skill}
                </div>
              ))}
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
        {showReviewModal && (
          <div className="review-modal transparent-background">
            <div className="review-modal">
              <div className="review-content">
                <div className="review-close-button">
                  <span
                    className="material-icons-outlined"
                    onClick={() => setShowReviewModal(false)}>
                    close
                  </span>
                </div>
                <div className="review-title">
                  <p>Customer rating</p>
                </div>
                <div className="review-item-content">
                  {ratings.map((rating) => (
                    <div className="review-item">
                      <div className="item-title-date">
                        <div className="item-title">
                          <p>{rating.buyerName}</p>
                        </div>
                        <div className="item-date">
                          <p>
                            {new Date(rating.created.seconds * 1000).toLocaleDateString('fi-FI')}
                          </p>
                        </div>
                      </div>
                      <div className="stars-rating-number">
                        <div className="stars">
                          {loopReviewStars(rating.stars).map((star) => star)}
                        </div>
                        <div className="rating-number">
                          <p>{rating.stars}</p>
                        </div>
                      </div>
                      <div className="rating-texts">
                        {rating.texts.map((text) => (
                          <div className="rating-text">{text}</div>
                        ))}
                      </div>
                      <div className="review-comment">
                        <p>{rating.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
